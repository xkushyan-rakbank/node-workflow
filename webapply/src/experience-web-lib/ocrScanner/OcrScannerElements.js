import React from "react";
import "./elementStyles.css";

import eidFrontPlaceholderImage from "../assets/images/eidfront.jpg";
import eidBackPlaceholderImage from "../assets/images/eidback.png";
import passportPlaceholderImage from "../assets/images/passport.jpg";

const OcrScannerElements = ({
  elementsProps: { scanInProgess, isOcrScannerReady, stopOcrScan } = {}
}) => {
  const elementsClassName = scanInProgess ? "" : "ocr-elements-hidden";
  //TODO: close
  return (
    <>
      {isOcrScannerReady && (
        <div className="App">
          <div id="sub-title"></div>
          <div id="title"></div>
          <div id="message-html"></div>
          <div id="processing"></div>
          <div id="main" className={elementsClassName}>
            <i className="ocr-elements-close-icon" onClick={stopOcrScan} />
            <div className="container">
              <div className="canvas-wrapper" id="canvas-wrapper">
                <video id="video"></video>
                <div id="place-holder-image">
                  <div id="eidfront-placeholder" className="placeholder-container">
                    <img
                      alt="eid-front"
                      src={eidFrontPlaceholderImage}
                      id="eidfront-placeholder-img"
                    />
                  </div>
                  <div id="eidback-placeholder" className="placeholder-container">
                    <img alt="eid-back" src={eidBackPlaceholderImage} />
                  </div>
                  <div id="passport-placeholder" className="placeholder-container">
                    <img alt="passport" src={passportPlaceholderImage} />
                  </div>
                </div>
              </div>
            </div>
            <div id="bottom-message" className="bottom-message"></div>
            <div id="error-message" className="error-message"></div>
          </div>
          <div id="label-container"></div>
        </div>
      )}
    </>
  );
};

export default OcrScannerElements;
