import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles({
  sectionContainer: {
    padding: "100px 0",
    "@media (max-width: 600px)": {
      padding: "0"
    }
  },
  containerText: {
    fontSize: "18px",
    color: "#373737",
    margin: "20px 0 40px",
    lineHeight: "1.5",
    textAlign: "center"
  },
  actionButton: {
    width: "200px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "normal",
    "@media (max-width: 372px)": {
      width: "100%",
      marginLeft: 0
    }
  },
  btnContainer: {
    padding: "5px",
    width: "100%",
    textAlign: "center"
  },
  iconContainer: {
    width: "200px",
    height: "180px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    "@media (max-width: 600px)": {
      width: "100px",
      height: "110px"
    }
  }
});
