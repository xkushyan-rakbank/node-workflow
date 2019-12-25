import React, { Suspense, lazy, useCallback, useReducer } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { getApplicantInfo } from "../../store/selectors/appConfig";
import chatIcon from "./../../assets/webchat/black.svg";
import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("./componets/WebChat"));

const initialState = {
  isOpened: false,
  isClosed: true,
  isMinimized: false,
  isExpanded: false
};

const webChatReducer = (state, { type }) => {
  switch (type) {
    case "open":
      return {
        ...state,
        isOpened: true,
        isClosed: false,
        isMinimized: false
      };
    case "close":
      return {
        ...state,
        isOpened: false,
        isClosed: true
      };
    case "minimize":
      return {
        ...state,
        isOpened: true,
        isMinimized: true,
        isClosed: false,
        isExpanded: false
      };
    case "expand":
      return { ...state, isExpanded: true, isMinimized: false };
    default:
      return state;
  }
};

const ChatComponent = ({ name, mobileNo, countryCode, email }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(webChatReducer, initialState);
  const { isOpened, isClosed, isMinimized } = state;
  const toogleChat = isMinimized ? classes.mimimized : classes.expand;
  const mobileNumber = `${countryCode + mobileNo}`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openChat = useCallback(() =>
    isClosed ? dispatch({ type: "open" }) : dispatch({ type: "expand" })
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeWebChat = useCallback(() => dispatch({ type: "close" }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const minimizeChat = useCallback(() => dispatch({ type: "minimize" }));

  return (
    <>
      {(isClosed || isMinimized) && (
        <div className={classes.chat}>
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
      )}

      {isOpened && (
        <div className={cx(classes.chatWrapper, toogleChat)}>
          <Suspense fallback={<div>Loading...</div>}>
            <WebChatComponent
              onClose={closeWebChat}
              onMinimize={minimizeChat}
              name={name}
              mobileNumber={mobileNumber}
              email={email}
            />
          </Suspense>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  name: getApplicantInfo(state).fullName,
  mobileNo: getApplicantInfo(state).mobileNo,
  countryCode: getApplicantInfo(state).countryCode,
  email: getApplicantInfo(state).email
});

export const Chat = connect(mapStateToProps)(ChatComponent);
