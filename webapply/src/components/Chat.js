import React from "react";
import chatIcon from "./../assets/images/chat.svg";
import { withStyles } from "@material-ui/core/styles";

const style = {
  chat: {
    position: "absolute",
    left: "77px",
    bottom: "50px",
    color: "#fff",
    fontSize: "18px",
    "@media only screen and (max-width: 1100px)": {
      fontSize: "14px"
    }
  },
  chatInner: {
    display: "flex",
    alignItems: "center",
    "@media only screen and (max-width: 991px)": {
      flexDirection: "column"
    },
    "& span": {
      width: "66px",
      height: "66px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: " #fff",
      borderRadius: "50%",
      boxShadow: "0 2px 14px 0 rgba(0, 0, 0, 0.18)",
      marginRight: "20px"
    },
    "& p": {
      margin: "0"
    },
    "& a": {
      textDecoration: "underline",
      fontWeight: "600",
      fontSize: "18px",
      color: "#fff",
      marginLeft: "5px"
    },
    "& img": {
      width: "30px",
      height: "30px"
    }
  }
};

const Chat = ({ classes }) => {
  return (
    <div className={classes.chat}>
      <div className={classes.chatInner}>
        <span>
          <img src={chatIcon} alt="chat" />
        </span>
        <a href="/"> Chat with Us</a>
      </div>
    </div>
  );
};

export default withStyles(style)(Chat);
