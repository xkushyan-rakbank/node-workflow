import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import smoothscroll from "smoothscroll-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import TagManager from "react-gtm-module";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { persistor, store } from "./store";
import { tagManagerArgs } from "./constants/gtm";
import { addPhoneNoValidationToYup } from "./utils/validation";

smoothscroll.polyfill();
TagManager.initialize(tagManagerArgs);
addPhoneNoValidationToYup();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
