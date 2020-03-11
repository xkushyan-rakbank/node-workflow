import React, { Suspense, lazy, useContext } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import cx from "classnames";

import { WebChatContext } from "./contextStore";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getSearchResults } from "../../store/selectors/searchProspect";

import { ClosedView } from "./ClosedView";
import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("./components/Chat"));

const ChatComponent = ({ className, searchResults, name, mobileNo, countryCode, email }) => {
  const classes = useStyles();
  const {
    closeWebChat,
    minimizeChat,
    handleReceiveNewMessage,
    isOpened,
    isClosed,
    isMinimized
  } = useContext(WebChatContext);

  const searchName = get(searchResults, "[0].applicantInfo.fullName", "");

  return [
    (isClosed || isMinimized) && <ClosedView />,
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
            InitiatedCustomerName={name || searchName}
            InitiatedCustomerMobile={`${countryCode}${mobileNo}`}
            EmailAddress={email}
            isAuth={false}
            onNewMessageReceive={handleReceiveNewMessage}
          />
        </Suspense>
      </div>
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
