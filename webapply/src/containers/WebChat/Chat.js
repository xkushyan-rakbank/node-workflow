import React, { useCallback, useRef, lazy, Suspense } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import get from "lodash/get";

import { useWebChatState } from "./hooks/useWebChatState";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getSearchResults } from "../../store/selectors/searchProspect";

import { useStyles } from "./styled";
import { ClosedChat } from "./components/ClosedChat";
import { Portal } from "./components/Portal";

const WebChatComponent = lazy(() => import("./core"));

const ChatComponent = ({ className, searchResults, name, mobileNo, countryCode, email }) => {
  const classes = useStyles();
  const closedChatRef = useRef(null);
  const [{ isOpened, isClosed, isMinimized }, dispatch] = useWebChatState();
  const searchName = get(searchResults, "[0].applicantInfo.fullName", "");

  const openChat = useCallback(() => dispatch({ type: isClosed ? "open" : "expand" }), [
    isClosed,
    dispatch
  ]);
  const closeWebChat = useCallback(() => dispatch({ type: "close" }), [dispatch]);
  const minimizeChat = useCallback(() => {
    dispatch({ type: "minimize" });
    closedChatRef.current.resetCounter();
  }, [dispatch]);

  const handleReceiveNewMessage = useCallback(() => {
    closedChatRef.current.incCounter();
  }, []);

  return [
    (isClosed || isMinimized) && (
      <ClosedChat key="link" ref={closedChatRef} openChat={openChat} isMinimized={isMinimized} />
    ),
    isOpened && (
      <Portal key="window" id="chat">
        <div
          className={cx(classes.chatWrapper, {
            [classes.mimimized]: isMinimized,
            [classes.expand]: !isMinimized
          })}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <WebChatComponent
              onClose={closeWebChat}
              onMinimize={minimizeChat}
              isAuth={false}
              onNewMessageReceive={handleReceiveNewMessage}
              InitiatedCustomerName={name || searchName}
              InitiatedCustomerMobile={`${countryCode}${mobileNo}`}
              EmailAddress={email}
            />
          </Suspense>
        </div>
      </Portal>
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
