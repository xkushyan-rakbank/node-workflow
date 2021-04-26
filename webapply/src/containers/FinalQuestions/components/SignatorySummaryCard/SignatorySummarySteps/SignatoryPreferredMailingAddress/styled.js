import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  sameAsCompanyAddressCheckbox: {
    width: "auto",
    margin: "0px 0px 0px 3px"
  },
  sameAsCompanyAddressBox: {
    display: "flex",
    alignItems: "center",
    margin: "12px 0 24px",
    flexDirection: "row",
    minHeight: "56px",
    justifyContent: "space-between"
  },
  questionIcon: {
    width: "24px",
    height: "24px"
  },
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "40px 0"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.9",
    color: "#373737"
  },
  divider: {
    marginTop: "30px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  }
});
