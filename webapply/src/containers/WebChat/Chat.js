import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import get from "lodash/get";

import { useWebChatState } from "./hooks/useWebChatState";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getSearchResults } from "../../store/selectors/searchProspect";

import chatIcon from "./../../assets/webchat/black.svg";

import { useStyles } from "./styled";
import { ChatWrapper } from "./ChatWrapper";

const ChatComponent = ({ className, searchResults, name, mobileNo, countryCode, email }) => {
  const classes = useStyles();
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [{ isOpened, isClosed, isMinimized }, dispatch] = useWebChatState();
  const searchName = get(searchResults, "[0].applicantInfo.fullName", "");

  const openChat = useCallback(() => dispatch({ type: isClosed ? "open" : "expand" }), [
    isClosed,
    dispatch
  ]);
  const closeWebChat = useCallback(() => dispatch({ type: "close" }), [dispatch]);
  const minimizeChat = useCallback(() => {
    dispatch({ type: "minimize" });
    setNewMessagesCount(0);
  }, [dispatch, setNewMessagesCount]);

  const handleReceiveNewMessage = useCallback(() => {
    setNewMessagesCount(newMessagesCount + 1);
  }, [setNewMessagesCount, newMessagesCount]);

  return [
    (isClosed || isMinimized) && (
      <div key="link" className={classes.chat}>
        <div className={classes.chatInner} onClick={openChat}>
          <div>
            <span>
              {isMinimized && (
                <div className={classes.messagesCount}>
                  <p>{newMessagesCount}</p>
                </div>
              )}
              <img src={chatIcon} alt="chat" />
            </span>
          </div>
          <div className="hide-on-mobile small-menu-hide"> Chat with Us</div>
        </div>
      </div>
    ),
    isOpened && (
      <ChatWrapper
        key="window"
        closeWebChat={closeWebChat}
        minimizeChat={minimizeChat}
        onNewMessageReceive={handleReceiveNewMessage}
        isMinimized={isMinimized}
        InitiatedCustomerName={name || searchName}
        InitiatedCustomerMobile={`${countryCode}${mobileNo}`}
        EmailAddress={email}
      />
    )
  ];
};

const mapStateToProps = state => ({
  searchResults: getSearchResults(state),
  name: getApplicantInfo(state).fullName,
  mobileNo: getApplicantInfo(state).mobileNo,
  countryCode: getApplicantInfo(state).countryCode,
  email: getApplicantInfo(state).email
});

export const Chat = connect(mapStateToProps)(ChatComponent);
export default Chat;
