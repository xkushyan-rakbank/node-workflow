import React from "react";
import { withStyles } from "@material-ui/core/styles";
import check_ic from "../assets/icons/check_outline_ic.svg";
import ContinueButton from "./Buttons/ContinueButton";

const style = {
  container: {
    border: "solid 1px #e8e8e8",
    width: "247px",
    height: 526,
    maxHeight: 526,
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: "#fff",
    padding: "37px 24px 40px",
    boxSizing: "border-box",
    margin: "20px 19px 0 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:last-child": {
      marginRight: 0
    },
    "@media only screen and (max-width: 1420px)": {
      padding: "18px 12px 20px",
      width: 237,
      height: 366
    }
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#373737",
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
    "& span": {
      display: "block",
      marginTop: 26
    },
    "@media only screen and (max-width: 1420px)": {
      fontSize: "18px",
      "& span": {
        marginTop: "13px",
        fontSize: "13px"
      },
      "& img": {
        width: 40,
        height: 40
      }
    }
  },
  divider: {
    border: "solid 1px #e8e8e8",
    margin: "30px auto 0",
    "@media only screen and (max-width: 1420px)": {
      margin: "15px auto 0"
    }
  },
  differences: {
    margin: "28px 0 0 0",
    paddingLeft: "20px",
    "& li": {
      fontSize: "16px",
      color: "#373737",
      listStyle: "none",
      position: "relative",
      "@media only screen and (max-width: 1420px)": {
        fontSize: "13px"
      },
      "& img": {
        position: "absolute",
        left: -20,
        top: 3
      },
      "& + li": {
        marginTop: 16
      }
    }
  },
  differencesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  buttonWrapper: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    "& span": {
      fontSize: "16px"
    }
  }
};

const AccountTypeCard = ({
  iconSrc,
  title,
  differences,
  buttonText,
  classes,
  handleClick,
  scrollToIndex
}) => (
  <div className={classes.container}>
    <div>
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
            <li key={index}>
              <img src={check_ic} alt="check icon" />
              {difference}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className={classes.buttonWrapper}>
      <ContinueButton handleClick={handleClick} name={scrollToIndex}>
        {buttonText}
      </ContinueButton>
    </div>
  </div>
);

export default withStyles(style)(AccountTypeCard);
