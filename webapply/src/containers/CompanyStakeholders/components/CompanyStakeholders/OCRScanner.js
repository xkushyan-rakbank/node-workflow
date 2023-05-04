/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import useOcrScanner from "../../../../experience-web-lib/ocrScanner/useOcrScanner";
import OcrScannerElements from "../../../../experience-web-lib/ocrScanner/OcrScannerElements";
import { useStyles } from "./styled";
const localizedMessagesOcr = {
  sub_title_eid_front: "Scan your EID(front)",
  title_eid_front: "Help us make sure it's you",
  sub_title_eid_back: "Scan your EID(back)",
  title_eid_back: "FLIP IT! FLIP IT! GOOD!",
  sub_title_passport: "Scan your Passport",
  title_passport: "Help us make sure it's you",
  sub_title_visa: "Scan your VISA",
  title_visa: "Help us make sure it's you",
  top_instruction_message_passport: "Show us the picture side of your Passport",
  top_instruction_message_eid_front: "Show us the picture side of your EID",
  top_instruction_message_eid_back: "Show us the opposite side of your EID",
  top_instruction_message_visa: "Show us the picture side of your VISA",
  eid_scan_front: "Please scan the front of your Emirates ID Card",
  eid_scan_back: "Please scan the back of your Emirates ID Card",
  visa_scan: "",
  passport_scan: "Please Scan your picture side of passport",
  document_inside_frame: "Position your document inside the frame",
  searching_document: "Searching for document",
  ok: "Ok",
  loading: "Document Reader Processing",
  capture_button_text: "Click to Scan ",
  document_left_instruction: "Document towards left. Please center",
  document_right_instruction: "Document towards right. Please center",
  document_center_instruction: "Please Centre your document",
  document_closer_instruction: "Place the document closer to the camera",
  document_tooclose_instruction: "Document too close!",
  document_good_position: "Good Position. Please wait!."
};

export const OCRScanner = ({ scanType, onScanData, onClose, sdkConfig }) => {
  const {
    isOcrScannerReady,
    //ocrInitError,
    //ocrScanError,localizedMessagesOcr
    ocrScanResult,
    startOcrScan,
    elementsProps
  } = useOcrScanner({
    sdkConfig,
    localizedMessagesOcr
  });
  const classes = useStyles();
  useEffect(() => {
    if (isOcrScannerReady) {
      startOcrScan({ scanType, onScanData, onClose });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOcrScannerReady]);

  return (
    <div className={classes.ocrScannerMainContainer}>
      <OcrScannerElements elementsProps={elementsProps} />

      {!isOcrScannerReady && <div className="initial-message">Document Reader Initializing</div>}
    </div>
  );
};
