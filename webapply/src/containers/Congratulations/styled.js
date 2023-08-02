import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  congratulationIcon: {
    marginBottom: "60px"
  },
  trackApplicationBtn: {
    backgroundColor: "#1F1F1F",
    // margin: "24px 0 40px",
    padding: "20px 40px",
    borderRadius: "100px",
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "32px",
    alignSelf: "flex-start",
    marginBottom: "40px"
  },
  congratulationsTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "40px"
  },
  applicationDetailWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "24px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)"
  },
  applicationNumber: {
    color: "#1F1F1F",
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "28px",
    margin: 0
  },
  applicationDesc: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "20px",
    margin: 0
  },
  horizontalLine: {
    backgroundColor: "#E6E6E6",
    height: "1px"
  },
  infoWrapper: {
    color: "#757575",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "16px"
  },
  infoIcon: {
    width: "16px !important",
    height: "16px !important"
  },
  successTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  }
}));
