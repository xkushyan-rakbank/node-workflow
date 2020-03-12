import React, { Suspense, lazy } from "react";
import cx from "classnames";

import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("./components/Chat"));

const ChatWrapperScreen = ({
  isMinimized,
  closeWebChat,
  minimizeChat,
  onNewMessageReceive,
  InitiatedCustomerName,
  InitiatedCustomerMobile,
  EmailAddress
}) => {
  const classes = useStyles();

  return (
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
          InitiatedCustomerName={InitiatedCustomerName}
          InitiatedCustomerMobile={InitiatedCustomerMobile}
          EmailAddress={EmailAddress}
          isAuth={false}
          onNewMessageReceive={onNewMessageReceive}
        />
      </Suspense>
    </div>
  );
};

export const ChatWrapper = React.memo(ChatWrapperScreen);
