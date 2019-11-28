import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    minWidth: "270px",
    maxHeight: "572px",
    padding: "40px 30px 25px 30px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    marginRight: "20px",
    "&:last-child": {
      marginRight: 0
    }
  },
  title: {
    fontSize: "20px",
    borderBottom: "solid 1px #e8e8e8",
    paddingBottom: "30px"
  },
  icon: {
    display: "flex",
    height: "80px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
    "& img": {
      width: "80px",
      height: "auto"
    }
  },
  name: {
    fontWeight: 600,
    textAlign: "center"
  },
  cost: {
    paddingTop: "25px",
    paddingBottom: "15px",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    "& span": {
      marginLeft: "5px"
    }
  },
  options: {
    paddingLeft: "25px",
    fontSize: "16px",
    "& li": {
      position: "relative",
      listStyleType: "none"
    },
    "& > li:not(:last-child)": {
      marginBottom: "20px"
    }
  },
  listIcon: {
    position: "absolute",
    top: "3px",
    left: "-25px"
  },
  nestedOptions: {
    paddingLeft: "20px",
    fontSize: "14px",
    "& li": {
      marginBottom: "5px"
    },
    "& li::after": {
      content: "''",
      position: "absolute",
      top: "10px",
      left: "-15px",
      width: "6px",
      height: "1px",
      backgroundColor: "#000"
    }
  },
  link: {
    fontSize: "14px",
    color: "#373737",
    textDecoration: "underline"
  },
  linkWrapper: {
    paddingBottom: "40px",
    borderBottom: "solid 1px #e8e8e8",
    fontWeight: "600"
  },
  upgrade: {
    paddingTop: "5px",
    fontSize: "14px",
    fontStyle: "italic",
    textAlign: "center",
    color: "#86868b"
  },
  indent: {
    marginBottom: "6px",
    "& strong": {
      fontWeight: "600"
    }
  },
  button: {
    fontSize: "16px",
    width: "200px",
    height: "40px",
    borderRadius: "21px",
    margin: "auto",
    "&>span": {
      justifyContent: "center"
    }
  }
});
