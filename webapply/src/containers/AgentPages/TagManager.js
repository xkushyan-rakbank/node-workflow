/* istanbul ignore file */

import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router";
import TagManager from "react-gtm-module";

import routes from "../../routes";

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
