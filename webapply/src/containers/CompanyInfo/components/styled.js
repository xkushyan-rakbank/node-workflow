import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  companyInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "40px"
  },
  companyInfoSectionWrapper: {
    padding: "0px",
    borderRadius: "10px",
    border: "unset",
    [theme.breakpoints.up("sm")]: {
      border: "1px solid #CCC",
      padding: "30px"
    }
  },
  companyInfoSectionForm: {
    display: "flex",
    flexDirection: "column",
    gap: "40px"
  },
  pageTitle: {
    fontSize: "28px",
    lineHeight: 1.17
  },
  topIndent: {
    marginTop: "40px"
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "#1F1F1F"
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: 400,
    color: "#757575",
    lineHeight: "1.3",
    margin: "0"
  },
  username: {
    fontSize: "20px",
    lineHeight: "1.3",
    margin: "0",
    color: theme.palette.text.color
  },
  continueButton: {
    margin: "20px 0 40px 0"
  },
  detailsContinueButton: {
    marginTop: 5
  },
  continueButtonGrid: {
    padding: 20
  },
  deleteButton: {
    height: "100%",
    paddingBottom: "20px",
    outline: "none"
  },
  continueButtonContainer: {
    flexWrap: "nowrap",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column"
    }
  },
  continueBtn: {
    [theme.breakpoints.only("xs")]: {
      alignSelf: "flex-end",
      marginTop: "10px"
    }
  },
  divider: {
    width: "100%",
    margin: "14px 0px 32px",
    color: "#E6E6E6"
  }
}));
