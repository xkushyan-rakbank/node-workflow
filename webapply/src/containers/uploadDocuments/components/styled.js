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
    alignItems: "center",
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
  }
});
