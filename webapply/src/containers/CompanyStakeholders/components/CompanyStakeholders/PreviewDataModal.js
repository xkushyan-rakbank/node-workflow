/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import cx from "classnames";

import { useStyles } from "./styled";
import { DOC_TYPE_EID, DOC_TYPE_PASSPORT } from "../../../../constants";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}
export const PreviewDataModal = ({ isOpen, handleClose, type, previewData }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const title = type === "id" ? "Emirates ID" : "passport photo page";

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
                <div
                  className={cx(classes.previewImg, classes.bgColor)}
                  style={{
                    backgroundImage: `url(${previewData.docFront.link})`
                  }}
                />
              </div>
              <div className={classes.previewImgWrapper}>
                <p className={classes.previewModalSubtitle}>Back</p>
                <div
                  className={cx(classes.previewImg, classes.bgColor)}
                  style={{
                    backgroundImage: `url(${previewData.docBack.link})`
                  }}
                />
              </div>
            </>
          )}
          {type === DOC_TYPE_PASSPORT && (
            <div className={classes.previewImgWrapper}>
              <p className={classes.previewModalSubtitle}>Photo page</p>
              <div
                className={cx(classes.previewImg, classes.bgColor)}
                style={{
                  backgroundImage: `url(${previewData.link})`
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
