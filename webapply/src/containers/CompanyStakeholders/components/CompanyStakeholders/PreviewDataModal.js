/* eslint-disable no-unused-vars */

import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { isDesktop } from "react-device-detect";

import { useStyles } from "./styled";
import { DOC_TYPE_EID, DOC_TYPE_PASSPORT } from "../../../../constants";
import { getKyc } from "../../../../store/selectors/kyc";
import { PdfPreview } from "../StakeholderTermsAndConditions/PDFconverter";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

const base64toBlob = data => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr("data:application/pdf;base64,".length);

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
};

function getFileLink(base64String) {
  const blob = base64toBlob(base64String);
  const url = URL.createObjectURL(blob);
  return url;
}

export const PreviewDataModal = ({ isOpen, handleClose, type, previewData }) => {
  const classes = useStyles();
  const { kycUploadedDocs } = useSelector(getKyc);
  const [modalStyle] = useState(getModalStyle);

  const title = type === "id" ? "Emirates ID" : "passport photo page";
  const isPDF = useCallback(file => {
    return file?.startsWith("data:application/pdf;base64");
  }, []);

  const context = link =>
    isPDF(link) ? (
      <div className={classes.previewImg}>
        {isDesktop ? (
          <object
            data={link ? link + "#toolbar=0" : ""}
            aria-label="Passport"
            onContextMenu={e => e.preventDefault()}
            className={classes.previewPDF}
            type="application/pdf"
          ></object>
        ) : (
          <PdfPreview file={getFileLink(link)} pages={[link]} />
        )}
      </div>
    ) : (
      <div
        className={classes.previewImg}
        style={{
          backgroundImage: `url(${link})`
        }}
      />
    );

  return (
    <Modal open={isOpen}>
      <div style={modalStyle} className={classes.paper}>
        <CloseIcon onClick={handleClose} className={classes.uploadModalCloseIcon} />
        <h2 className={classes.previewModalTitle}>Review your {title}</h2>
        <p className={classes.previewModalSubtitle}>
          Make sure the entire {type === "id" ? "ID" : "photo page"} is within the frame and that
          all of the text is clear.
        </p>
        <div className={classes.previewModalImageWrapper}>
          {type === DOC_TYPE_EID && (
            <>
              <div className={classes.previewImgWrapper}>
                <p className={classes.previewModalSubtitle}>Front</p>
                {context(kycUploadedDocs?.eidFront?.link)}
              </div>
              <div className={classes.previewImgWrapper}>
                <p className={classes.previewModalSubtitle}>Back</p>
                {context(kycUploadedDocs?.eidBack?.link)}
              </div>
            </>
          )}
          {type === DOC_TYPE_PASSPORT && (
            <div className={classes.previewImgWrapper}>
              <p className={classes.previewModalSubtitle}>Photo page</p>
              {context(kycUploadedDocs?.passport?.link)}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
