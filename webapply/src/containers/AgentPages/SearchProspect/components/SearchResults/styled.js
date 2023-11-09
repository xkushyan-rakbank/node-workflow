import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../../../theme";

export const useStyles = makeStyles({
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    display: "flex",
    padding: "24px 20px 19px 30px",
    color: "#263d4c",
    justifyContent: "center",
    "@media (max-width: 620)": {
      padding: "24px 10px 19px 10px"
    }
  },
  disabled: {
    opacity: "0.5",
    pointerEvents: "none",
    userSelect: "none"
  },
  fullName: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "#263d4c",
    minHeight: "18px",
    marginRight: "5px",
    wordBreak: "break-word"
  },
  companyName: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#263d4c",
    wordBreak: "break-word"
  },
  notFound: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: 1,
    color: "#263d4c",
    textAlign: "center",
    width: "100%"
  },
  account: {
    fontSize: "14px",
    color: "#86868b",
    marginTop: 5,
    minHeight: "18px",
    marginRight: "5px",
    wordBreak: "break-word",
    wordWrap: "break-word"
  },
  status: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "14px",
    color: "#373737",
    padding: "3px 5px",
    // display: "inline-block",
    overflowWrap: "break-word"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  },
  column: {
    width: "40%",
    "&:last-child": {
      width: "20%",
      alignSelf: "center"
    }
  },
  heading: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "#263d4c",
    minHeight: "18px"
  },

  searchItemContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignSelf: "stretch",
    marginTop: "2rem"
  },
  searchItemCard: {
    display: "flex",
    padding: "1.5rem",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: "0.625rem",
    background: "#FFF",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    gap: "1rem",
    border: "1px solid var(--color-dark-grey, #757575)"
  },
  searchItemStatus: {
    display: "flex",
    alignItems: "unset",
    justifyContent: "space-between",
    flexFlow: "column",
    width: "100%",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      gap: "unset",
      alignItems: "center",
      flexFlow: "unset"
    }
  },
  preview: {
    paddingTop: "0 !important"
  },
  statusCont: {
    display: "flex",
    alignItems: "center",
    gap: "0.62rem"
  },
  label: {
    color: " var(--color-palette-grey-tones-600, #1F1F1F)",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1rem"
  },
  statusDiv: {
    display: "flex",
    padding: "0.3125rem",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "0.625rem",
    borderRadius: "0.3125rem",
    background: "var(--color-palette-green-100, #FBD0D1)",
    color: "var(--color-palette-yellow-900, #332600)",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1rem"
  },
  searchItemDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      gap: "3.94rem"
    }
  },
  appDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    flexWrap: "wrap",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "8.9375rem"
    }
  },
  appDetailsHeader: {
    color: "#000",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "1rem"
  },
  appDetailsinfo: {
    color: "var(--color-palette-grey-tones-500, #525252)",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.25rem",
    width: "100%",
    wordWrap: "break-word"
  },
  applicationDetails: {
    flex: "1"
  },
  companyDetails: {
    flex: "3"
  },
  reason: {
    maxWidth: "unset",
    flex: "4"
  },
  remarks: {
    gap: "0.5rem",
    maxWidth: "unset"
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
  },
  lineBreak: {
    height: "0.0625rem",
    background: "#E6E6E6",
    width: "100%"
  },
  button: {
    marginTop: "0px !important",
    borderRadius: "6.25rem",
    border: "1px solid #000",
    width: "unset",
    "& button": {
      backgroundColor: "transparent !important",
      boxShadow: "none !important",
      "& span": {
        color: "var(--color-black, #3B3A3A) !important",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "1rem"
      }
    }
  },
  greencard: {
    background: "var(--color-palette-green-100, #D9F2E5)"
  },
  greycard: {
    background: "var(--color-palette-grey-tones-100, #E6E6E6)"
  },
  yellowcard: {
    background: "var(--color-palette-yellow-100, #FFF2CC)"
  }
});
