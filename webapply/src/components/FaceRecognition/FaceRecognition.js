import React, { Fragment, useEffect } from "react";
import { Button } from "@material-ui/core";
import cx from "classnames";
import { useSelector } from "react-redux";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { useStyles } from "./styled";
import { ReactComponent as FaceScanIcon } from "../../assets/icons/face_scan.svg";
import useFaceScan from "../../experience-web-lib/ocrScanner/useFaceScan";
import { getKyc } from "../../store/selectors/kyc";
import { checkFaceLiveliness, setLivelinessData } from "../../store/actions/kyc";
import { ReactComponent as SuccessIcon } from "../../assets/icons/credit_score.svg";

const localizedMessagesLiveness = {
  record_button: "Record",
  result_close_button: "Close",
  alert_close_button: "OK",
  action_photo_button: "Take photo",
  action_confirm_button: "Confirm",
  action_repeat_button: "Repeat",
  action_skip_button: "Skip",
  action_camera_switch_button: "Switch camera",
  analysis_in_progress: "Analyzing, please wait for result",
  accessing_camera: "Accessing Camera. It may take few seconds.",
  device_turn: "Please turn your device",
  more_than_one_face: "Make sure there are no other faces",
  number_of_attempts_exhausted: "Number of attempts exhausted",
  result_state_processing: "Analysis in progress",
  result_state_finished: "Analysis complete",
  action_hint_not_centered: "Align your face with the frame",
  action_hint_move_closer: "Closer",
  action_hint_move_away: "Move away",
  action_hint_move_even_closer: "Even closer",
  action_hint_move_even_away: "Even further",
  action_hint_look_straight: "Turn your face straight to the camera",
  action_hint_dont_smile: "Will ask you to smile later; don't smile now please",
  action_hint_dont_left_or_right_head:
    "Will ask you to turn head later; Look straight at the camera now please",
  action_hint_open_eyes_wide: "Open your eyes wide",
  action_hint_face_aligned: "Great, don't move",
  action_hint_remove_sunglasses: "Please, take off the sunglasses",
  action_hint_remove_mask: "Please, take off the mask",
  action_repeat: "Please repeat the action",
  action_tutorial_button: "Instruction",
  action_zoom_in_go: "Move your face closer to the screen",
  action_zoom_out_go: "Move your face farther from the screen",
  action_smile_go: "Smile",
  action_blink_go: "Close your eyes and open them",
  action_head_up_go: "Raise your head up",
  action_head_down_go: "Lower your head down",
  action_head_right_go: "TURNING YOUR HEAD, look to your right",
  action_head_left_go: "TURNING YOUR HEAD, look to your left",
  action_look_at_screen: "Look at the screen",
  action_hint_too_dark: "Find better lighting conditions",
  action_hint_too_blurry: "The image is too blurry",
  action_hint_OK: "Great!",
  action_hint_OK_intermediate: "Great, don't move",
  processing_data: "Processing data",
  uploading_data: "Uploading data",
  requesting_result: "Requesting results",
  network_video_analyses_status_failed: "Analysis error",
  network_upload_status_processing: "Uploading video…",
  network_upload_status_done: "Video uploaded",
  network_upload_status_failed: "Upload error",
  network_upload_status_processing_image: "Uploading photo…",
  network_upload_status_done_image: "Photo uploaded",
  network_upload_status_failed_image: "Upload error",
  network_video_analyses_status_analyse_is: "Analysis ",
  network_video_analyses_status_analyse_is_processing: "Analysis is in progress",
  network_request_failed: "Request error",
  alert_dialog_fail_action_title: "Requested action is not detected",
  check_internet_connection: "No internet connection",
  see_on_this_text: "Look at this text",
  doc_upload_button: "Upload an image",
  doc_button_separator: "– or –",
  doc_capture_button: "Take a photo",
  error_no_camera: "Error: Unable to access the camera.",
  error_no_camera_ios:
    "Error: Unable to access the camera. <br/> Please use default browser (Safari).",
  error_bad_camera: "Error: Unable to use the camera.",
  error_slow_backend:
    "This browser doesn't support some important features. <br /><br /> For your convenience, please open this page in another browser.",
  error_data_upload: "Upload error.",
  error_result: "Result error.",
  error_unknown: "Unknown error.",
  error_upload_too_big: "Error: File size limit exceeded.",
  error_upload_unknown: "Error: Unable to process the file."
};

const livenessChecklist = [
  //"SMILE",
  "CLOSE_EYES_AND_OPEN"
  // "TURN_HEAD_TO_LEFT",
  //"TURN_HEAD_TO_RIGHT",
  // "ZOOM_OUT",
  // "ZOOM_IN",
  //"RAISE_HEAD_UP",
];

export const FaceRecognition = ({
  fieldDescription,
  helperText,
  isStepActive = true,
  disabledReason,
  tempKey,
  transactionId,
  sdkConfig,
  livenessData = null,
  onFaceScanData,
  openFaceScan,
  dispatch,
  ...props
}) => {
  const classes = useStyles();

  const {
    isLivenessCheckReady,
    livenessCheckError,
    startLivenessCheck,
    executeLivenessFeedback
  } = useFaceScan({
    sdkConfig,
    tempKey,
    localizedMessagesLiveness,
    livenessChecklist
  });
  const { identityValidation, faceLivelinessFeedback, faceScanSuccess } = useSelector(getKyc);

  const onResult = async result => {
    dispatch(checkFaceLiveliness(result));
  };

  async function executeFeedback(faceLivelinessFeedback) {
    const feedbackResult = await executeLivenessFeedback(faceLivelinessFeedback);
    dispatch(setLivelinessData(feedbackResult));
  }

  useEffect(() => {
    if (faceLivelinessFeedback) {
      executeFeedback(faceLivelinessFeedback);
    }
  }, [faceLivelinessFeedback]);

  useEffect(() => {
    if (livenessCheckError) {
      Notification.add({
        title: livenessCheckError.code,
        message: livenessCheckError.message
      });
    }
  }, [livenessCheckError]);

  const startFaceScan = () => {
    if (!isLivenessCheckReady) {
      return;
    }
    startLivenessCheck({ onResult });
  };

  return (
    <Fragment>
      <div className={classes.fieldDescription}>{fieldDescription}</div>
      {!isStepActive && <div className={classes.disabledReason}>{disabledReason}</div>}
      <div className={cx(classes.facseScanContainer, !isStepActive ? classes.disableUpload : "")}>
        <div className={classes.contentContainer}>
          <FaceScanIcon height="44" width="40" alt="faceRecognitionIcon" />
          <div style={{ marginLeft: "20px" }}>
            <div className={classes.content}>Face ID</div>
            <div className={classes.subcontent}>{helperText}</div>
          </div>
        </div>
        {faceScanSuccess && isStepActive ? (
          <div className={classes.completedWrapper}>
            <SuccessIcon />
            <span>Completed</span>
          </div>
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classes.actionButton}
            disabled={!isStepActive}
            onClick={startFaceScan}
          >
            Start
          </Button>
        )}
      </div>
      {isStepActive && (
        <p className={classes.disclaimerInfo}>
          Please note: By selecting Start, you give us permission to retrieve your data and verify
          your face against your ID documents.
        </p>
      )}
      {identityValidation && (
        <div className={classes.uploadModalErrorWrapper}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          {identityValidation}
        </div>
      )}
    </Fragment>
  );
};
