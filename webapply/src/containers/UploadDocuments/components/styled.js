import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "15px",
    paddingRight: "32px"
  },
  companyDocuments: {
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "30px",
    paddingLeft: "24px",
    paddingRight: "10px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    borderTop: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  companyIconWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "solid 1px #e9e9ed",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    "&>img": {
      height: "unset",
      width: "20px"
    }
  },
  fileIconWarp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#ffffff"
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  label: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    color: "#373737"
  },
  controlsBox: {
    width: "130px",
    height: "32px",
    borderRadius: "21px",
    border: "solid 1px #373737",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#373737",
    cursor: "pointer",
    lineHeight: "2.2"
  }, //signatory css starts
  signatoreyContainer: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    marginTop: "20px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "20px 35px 20px 25px"
  },
  greenAvatar: {
    backgroundColor: "#166a2c",
    width: "40px",
    fontSize: "14px",
    fontWeight: 600
  },
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 16px"
  },
  SignatoryRights: {
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.29",
    letterSpacing: "normal",
    color: "#373737"
  },
  fileUploadPlaceholder: {
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    padding: "0 25px",
    borderTop: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  disabled: {
    pointerEvents: "none",
    opacity: "0.6"
  },
  ContentBox: {
    alignItems: "center",
    flexGrow: "1",
    padding: "7px 18px"
  },

  uploadedFileName: {
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1",
    letterSpacing: "normal",
    color: "#373737",
    display: "block"
  },

  fileSizeMessage: {
    color: "#888888",
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: ".6",
    letterSpacing: "normal",
    "& p": {
      margin: 0
    },
    "@media (max-width: 620px)": {
      lineHeight: "1"
    }
  },
  ControlsBox: {
    minWidth: "130px",
    height: "32px",
    borderRadius: "21px",
    border: "solid 1px #373737",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#373737",
    cursor: "pointer",
    lineHeight: "2.2"
  },
  UploadedContentBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  uploadFileName: {
    fontSize: "12px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.17",
    letterSpacing: "normal",
    color: "#373737",
    display: "flex",
    alignItems: "center"
  },
  signatoryRights: {
    width: "39px",
    height: "14px",
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.17",
    letterSpacing: "normal",
    color: "#888888",
    paddingLeft: "9px"
  },
  SignatoryRightsCopy: {
    width: "25px",
    height: "18px",
    fontSize: "12px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "right",
    color: "#373737",
    paddingLeft: "11px"
  },
  cancel: {
    width: "24px",
    height: "24px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    cursor: "pointer"
  },
  defaultInput: {
    display: "none"
  },
  myProgressBar: {
    height: "4px",
    borderRadius: "3px",
    textAlign: "center",
    lineHeight: "32px",
    color: "black",
    backgroundColor: "#373737",
    width: "100%",
    transition: "width 0.2s ease"
  },
  progressStatus: {
    display: "inline-block",
    paddingLeft: "11px"
  },
  nameSkeleton: {
    width: "210px",
    height: "40px",
    borderRadius: "8px",
    marginLeft: "25px"
  },
  contentSkeleton: {
    width: "400px",
    height: "30px",
    margin: "20px 0 20px 15px",
    borderRadius: "8px"
  },
  buttonSkeleton: {
    width: "140px",
    height: "35px",
    marginBottom: "0px",
    marginLeft: "230px",
    borderRadius: "28px"
  },
  errorExplanation: {
    fontSize: "12px",
    color: "#ea2925",
    margin: 0
  }
});
