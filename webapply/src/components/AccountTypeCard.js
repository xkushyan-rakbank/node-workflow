import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  container: {
    border: "solid 1px #e8e8e8",
    width: "247px",
    minHeight: "516px",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: "#fff",
    padding: "28px 24px",
    boxSizing: "border-box",
    "& + &": {
      marginLeft: "25px"
    }
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#373737",
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center"
  },
  divider: {
    border: "solid 1px #e8e8e8",
    margin: "30px auto 0"
  },
  differences: {
    margin: "27px 0 0 0",
    paddingLeft: "20px",
    "& li": {
      fontSize: "16px",
      color: "#373737",
      "& + li": {
        marginTop: "15px"
      }
    }
  },
  differencesContainer: {
    minHeight: "238px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#000",
    borderRadius: "21px",
    padding: "11px 20px",
    width: "100%",
    border: "none",
    marginTop: "15px"
  }
};

const AccountTypeCard = ({
  iconSrc,
  title,
  differences,
  buttonText,
  classes
}) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <div>
        <img src={iconSrc} alt={title} />
      </div>
      <span>{title}</span>
    </div>
    <div className={classes.divider}> </div>
    <div className={classes.differencesContainer}>
      <ul className={classes.differences}>
        {differences.map((difference, index) => (
          <li key={index}>{difference}</li>
        ))}
      </ul>
      <button className={classes.button}>{buttonText}</button>
    </div>
  </div>
);

export default withStyles(style)(AccountTypeCard);
