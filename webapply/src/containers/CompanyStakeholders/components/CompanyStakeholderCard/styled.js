import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/styles";

export const EditButton = styled("button")({
  border: "none",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  padding: "0",
  outline: "none"
});

export const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    display: "flex",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    marginBottom: "24px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    margin: "30px 32px 30px 20px"
  },
  userInfo: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between"
  },
  nameField: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "600",
    marginLeft: "20px"
  },
  arrow: {
    width: "32px",
    height: "32px",
    transform: "rotate(180deg)"
  },
  formContent: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)"
  },
  footerPart: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    opacity: 0.62,
    lineHeight: 1.5,
    textAlign: "center",
    padding: "12px"
  },
  button: {
    fontSize: "16px",
    color: "#c00000 !important"
  }
});
