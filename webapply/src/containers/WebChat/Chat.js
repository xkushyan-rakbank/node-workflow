import React, { Suspense, lazy, useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { useWebChatState } from "./hooks/useWebChatState";
import { getApplicantInfo } from "../../store/selectors/appConfig";

import chatIcon from "./../../assets/webchat/black.svg";

import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("./componets/WebChat"));

const ChatComponent = ({ name, mobileNo, countryCode, email }) => {
  const classes = useStyles();
  const [{ isOpened, isClosed, isMinimized }, dispatch] = useWebChatState();

  const openChat = useCallback(() => {
    dispatch({ type: isClosed ? "open" : "expand" });
  }, [isClosed, dispatch]);
  const closeWebChat = useCallback(() => dispatch({ type: "close" }), [dispatch]);
  const minimizeChat = useCallback(() => dispatch({ type: "minimize" }), [dispatch]);

  return [
    (isClosed || isMinimized) && (
      <div key="link" className={classes.chat}>
        <div className={classes.chatInner} onClick={openChat}>
          <div>
            <span>
              {isMinimized && (
                <div className={classes.messagesCount}>
                  <p>0</p>
                </div>
              )}
              <img src={chatIcon} alt="chat" />
            </span>
          </div>
          <div className="hide-on-mobile"> Chat with Us</div>
        </div>
      </div>
    ),
    isOpened && (
      <div
        key="window"
        className={cx(classes.chatWrapper, {
          [classes.mimimized]: isMinimized,
          [classes.expand]: !isMinimized
        })}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <WebChatComponent
            onClose={closeWebChat}
            onMinimize={minimizeChat}
            name={name}
            mobileNumber={`${countryCode}${mobileNo}`}
            email={email}
          />
        </Suspense>
      </div>
    )
  ];
};

const mapStateToProps = state => ({
  name: getApplicantInfo(state).fullName,
  mobileNo: getApplicantInfo(state).mobileNo,
  countryCode: getApplicantInfo(state).countryCode,
  email: getApplicantInfo(state).email
});

export const Chat = connect(mapStateToProps)(ChatComponent);
