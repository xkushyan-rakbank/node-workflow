import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router";
import routes from "./routes";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-654654",
  events: {
    eventInfo: "CO_OTP_Verfied",
    eventname: "OTP_Verify"
  }
};

TagManager.initialize(tagManagerArgs);

const app = document.getElementById("app");
ReactDOM.render(<Router routes={routes} />, app);
