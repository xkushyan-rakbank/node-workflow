import React, { useState, forwardRef, useCallback } from "react";
//import { useDispatch } from "react-redux";

import { useStyles } from "../styled";
import chatIcon from "../../../assets/webchat/black.svg";
//import { updateProspect } from "../../../store/actions/appConfig";

const ClosedChatScreen = ({ openChat, isMinimized }, ref) => {
  const classes = useStyles();
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const resetCounter = useCallback(() => setNewMessagesCount(0), [setNewMessagesCount]);
  const incCounter = useCallback(() => setNewMessagesCount(newMessagesCount + 1), [
    setNewMessagesCount,
    newMessagesCount
  ]);

  ref.current = { incCounter, resetCounter };
  // const [isArabic, setIsArabic] = useState(true);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   setLang("en");
  // }, []);

  // const setLang = lang => {
  //   lang === "ar" ? setIsArabic(false) : setIsArabic(true);
  //   dispatch(
  //     updateProspect({
  //       "prospect.freeFieldsInfo.freeField3": lang === "en" ? "true" : "false"
  //     })
  //   );
  // };

  return (
    <div className={classes.chat}>
      {/* <div className={classes.chatInner}> */}
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
        {/* </div>
        {isArabic ? (
          <a
            role="button"
            style={{ color: "#fff", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setLang("ar")}
          >
            {"(English)"}
          </a>
        ) : (
          <a
            role="button"
            style={{ color: "#fff", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setLang("en")}
          >
            {"(عربي)"}
          </a>
        )} */}
      </div>
    </div>
  );
};

export const ClosedChat = forwardRef(ClosedChatScreen);
