import { connect } from "react-redux";

import { Chat } from "./Chat";
import {
  openWebChat,
  closeWebChat,
  minimizeWebChat,
  expandWebChat
} from "../../store/actions/webChat";

const mapStateToProps = state => ({
  isOpened: state.webChat.opened,
  isClosed: state.webChat.closed,
  isMinimized: state.webChat.minimized
});

const mapDispatchToProps = {
  openWebChat,
  closeWebChat,
  minimizeWebChat,
  expandWebChat
};

export const WebChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
