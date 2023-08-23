import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  heading: {
    color: "var(--color-text-primary-on-light, #1F1F1F)",
    fontSize: "1.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "2.25rem",
    margin: "3rem 0"
  },
  additionalInformationWrapper: {
    display: "flex",
    padding: "20px",
    flexDirection: "column",
    gap: " 1.5rem",
    borderRadius: "10px",
    // border-radius: 0.625rem,
    background: "var(--color-white, #FFF)",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    // border: "1px solid #CCC",
    [theme.breakpoints.up("sm")]: {
      padding: "30px"
    }
  },
  companyNameinfoContainer: {},
  informationType: {
    color: "#1F1F1F",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem"
  },
  innerCards: {
    display: "flex",
    padding: "1.5rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
    aligSelf: "stretch",
    borderRadius: "0.625rem",
    background: "#FFF",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)"
  },
  infoType: {
    display: "flex",
    alignItems: "flex-start",
    gap: "5.625rem"
  },
  infoLabel: {
    color: "#000",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "1rem",
    minWidth: "8rem"
  },
  infoValue: {
    color: "var(--color-palette-grey-tones-500, #525252)",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.25rem" /* 166.667% */
  },
  infoCont: {
    display: "flex",
    alignItems: "flex-start",
    justifContent: "center"
  },
  textAreaStyle: {
    borderRadius: 0
  },
  customUrlLabel: {
    margin: "0px"
  },
  textArea: {
    width: "100%"
  },
  addMoreButton: {
    border: "1px solid #1F1F1F",
    borderRadius: "21px",
    padding: "9px 24px",
    color: "#1F1F1F",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22px",
    textTransform: "none",
    width: "max-content",
    marginTop: "20px"
  },
  fileUpload: {
    width: "100%"
  }
}));
