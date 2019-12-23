import cometd from "cometd";
import has from "lodash/has";
import { callSafely } from "./GenericUtils";

const chatUrl = "https://conv.rakbankonline.ae/CHATDEV";
const chatChannel = "/service/chatV2/digital-chat";
const connectedStatus = "connected";
const ChatOperationTypes = Object.freeze({
  RequestChat: "requestChat",
  SendMessage: "sendMessage",
  ClientStartTyping: "startTyping",
  ClientStopTyping: "stopTyping",
  SyncNotifications: "requestNotifications",
  UpdateNickName: "updateNickname",
  ChatDisconnect: "disconnect",
  IncomingMessage: "Message",
  ParticipantJoined: "ParticipantJoined",
  TypingStarted: "TypingStarted",
  TypingStopped: "TypingStopped",
  ParticipantLeft: "ParticipantLeft"
});

export const agentEvents = Object.freeze({
  LOGIN: "LOGIN"
});

export const UserTypes = Object.freeze({
  External: "External",
  Agent: "Agent",
  Client: "Client"
});

export class GenesysChat {
  static chatInstance;
  static getInstance() {
    if (GenesysChat.chatInstance === undefined) {
      GenesysChat.chatInstance = new GenesysChat();
    }
    return GenesysChat.chatInstance;
  }

  constructor() {
    this.cometD = new cometd.CometD();
    this.chatMessages = [];
    this.secureKey = "";
    this.lastPosition = 0;
    this.userInfo = {};
    this.eventsCallback = "";
    this.messagesCallback = "";

    this.configureChat();
  }

  /**
   * Sets up basic cometD configuration parameters.
   */
  configureChat = () => {
    this.cometD.configure({
      url: chatUrl + "/cometd",
      logLevel: "debug"
    });
    const TimeStampExtension = require("cometd/TimeStampExtension");
    this.cometD.registerExtension("timestamp", new TimeStampExtension());
    this.cometD.websocketEnabled = false;
  };

  /**
   * Handshake and subscribe function will trigger in this method.
   * @param userInfo - chat window element
   *  call back type is specified as any because response coming from the cometd plugin file.
   */

  initChat = userInfo => {
    // Handshake with the server.
    if (this.cometD.getStatus() !== connectedStatus) {
      this.handshake = this.cometD.handshake(h => {
        if (h.successful) {
          this.subscribeToChannel();
        } else {
          console.warn("hanshake failure: ", h);
        }
      });

      this.userInfo = userInfo;
    }
  };

  subscribeToChannel = () => {
    this.subsctiption = this.cometD.subscribe(
      chatChannel,
      messages => {
        if (messages.data.secureKey !== undefined) {
          this.secureKey = messages.data.secureKey;
        }
        this.errorHandler(messages)
          .then(this.onReceiveData)
          .catch(error => console.warn("Error: ", error));
      },
      this.onSubscribeStatus
    );
  };

  unSubscribe = () => {
    if (this.subsctiption) {
      this.cometD.unsubscribe(this.subsctiption);
      this.subsctiption = undefined;
    }
  };

  onSubscribeStatus = subscribeReply => {
    if (subscribeReply.successful) {
      this.sendChatRequest();
    }
  };

  addMessage = ({ text: message, utcTime: messageUtcTime, index, from }) => {
    const utcTime = new Date(messageUtcTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const messageObject = {
      message,
      utcTime,
      type: from.type,
      id: index,
      name: from.nickname
    };
    this.chatMessages.push(messageObject);
    callSafely(this.messagesCallback, [...this.chatMessages]);
  };

  errorHandler = receivedData => {
    return new Promise((resolve, reject) => {
      if (has(receivedData, "errors")) {
        reject(receivedData.errors);
      } else {
        resolve(receivedData);
      }
    });
  };

  onReceiveData = (message, callBack) => {
    const dataFromServer = message.data;
    this.lastPosition = dataFromServer.nextPosition;
    if (has(dataFromServer, "messages")) {
      dataFromServer.messages.map(message => {
        if (has(agentEvents, message.text)) {
          callSafely(this.eventsCallback, message.text);
        } else {
          switch (message.type) {
            case ChatOperationTypes.IncomingMessage: {
              this.addMessage({ ...message });
              break;
            }
            case ChatOperationTypes.ParticipantJoined: {
              if (
                message.from.type === UserTypes.Agent ||
                message.from.type === UserTypes.External
              ) {
                const updatedMessage = {
                  text: "Agent " + message.from.nickname + " joined the chat"
                };

                this.addMessage({ ...message, ...updatedMessage });
              }

              break;
            }
            case ChatOperationTypes.ParticipantLeft: {
              if (message.from.type === UserTypes.Agent) {
                const updatedMessage = {
                  text:
                    "The chat agent left the room. Thank you for chatting with Rakbank.\nHave a nice day!"
                };

                this.addMessage({ ...message, ...updatedMessage });
                this.agentLeftEvent(true);
              }
              break;
            }
            case ChatOperationTypes.TypingStarted:
            case ChatOperationTypes.TypingStopped: {
              if (message.from.type === UserTypes.Agent) {
                this.onTypingEvents(message.type === ChatOperationTypes.TypingStarted);
              }
              break;
            }
          }
        }
      });
    } else {
      switch (dataFromServer.operation) {
        case ChatOperationTypes.SendMessage:
        case ChatOperationTypes.RequestChat: {
          this.chatMessages.push(dataFromServer);
          callSafely(callBack, [...this.chatMessages]);
          break;
        }
      }
    }
  };

  sendChatRequest = () => {
    const requestChatData = {
      operation: ChatOperationTypes.RequestChat,
      firstName: this.userInfo.name,
      lastName: this.userInfo.name,
      subject: this.userInfo.selectedSubject,
      userData: {
        key1: "v1",
        key2: "v2",
        message: this.userInfo.message
      },
      auth: {
        username: "genesys",
        password: "genesys"
      }
    };

    this.cometD.publish(chatChannel, requestChatData);
  };

  /**
   * Sends chat message
   * @param message - message to send
   */

  sendChatMessage = message => {
    return new Promise((resolve, reject) => {
      const sendMessageData = {
        operation: ChatOperationTypes.SendMessage,
        message,
        secureKey: this.secureKey
      };

      this.cometD.publish(chatChannel, sendMessageData, publishResponse => {
        if (publishResponse.successful) {
          resolve(publishResponse);
        } else {
          reject();
        }
      });
    });
  };

  userStartedTyping = (userName = "User") => {
    const sendMessageData = {
      operation: ChatOperationTypes.ClientStartTyping,
      message: userName + " started typing",
      secureKey: this.secureKey
    };
    this.cometD.publish(chatChannel, sendMessageData);
  };

  userStopedTyping = (userName = "User") => {
    const sendMessageData = {
      operation: ChatOperationTypes.ClientStopTyping,
      message: userName + " stoped typing",
      secureKey: this.secureKey
    };
    this.cometD.publish(chatChannel, sendMessageData);
  };

  /**
   * This method will triggers disconnect event.
   * @param forceDisconnect - boolean denote when user logout session.
   */

  triggerDisconnectEvent = () => {
    const disconnectData = {
      operation: ChatOperationTypes.ChatDisconnect,
      secureKey: this.secureKey
    };
    this.cometD.publish(chatChannel, disconnectData);
    this.unSubscribe();
  };

  requestNotifications = () => {
    const requestNotificationData = {
      operation: ChatOperationTypes.SyncNotifications,
      secureKey: this.secureKey,
      transcriptPosition: parseInt(this.lastPosition)
    };
    this.cometD.publish(chatChannel, requestNotificationData);
  };

  updateNickName = nickName => {
    const updateNicknameData = {
      operation: ChatOperationTypes.UpdateNickName,
      nickname: nickName,
      secureKey: this.secureKey
    };
    this.cometD.publish(chatChannel, updateNicknameData);
  };

  setOnTypingEventsHandler = handler => {
    this.onTypingEvents = handler;
  };

  setOnAgentLeftEventHandler = handler => {
    this.agentLeftEvent = handler;
  };

  /**
   * Trigger this function when we minimizes the chat.
   */

  minimizeChat = () => {
    this.isChatMinimized = true;
    if (this.cometD) {
      this.cometD.disconnect();
    }
    if (this.intervalAPICall) {
      this.intervalAPICall.unsubscribe();
    }
  };
}
