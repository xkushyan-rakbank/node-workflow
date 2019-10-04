import React from "react";
import { withStyles } from "@material-ui/core/styles";
import check_ic from "../assets/images/check.png";
import ContinueButton from "./Buttons/ContinueButton";
import { portraitOrientationQueryIPads } from "../constants/styles";

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
    "@media only screen and (max-height: 1100px)": {
      margin: "20px 10px 0 0px"
    },
    [portraitOrientationQueryIPads]: {
      padding: "5px 24px 11px",
      marginTop: "10px",
      width: "100%",
      height: "auto"
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
      marginTop: 26,
      width: "100%"
    },
    "@media only screen and (max-width: 1420px)": {
      "& span": {
        marginTop: "10px",
        display: "block",
        minHeight: "44px"
      },
      "& img": {
        width: 50,
        height: 50
      }
    },
    "@media only screen and (max-width: 1220px)": {
      "& span": {
        margin: "13px"
      }
    },
    [portraitOrientationQueryIPads]: {
      flexDirection: "row",
      fontSize: "17px",
      "& span": {
        margin: "0px",
        textAlign: "left"
      }
    }
  },
  divider: {
    border: "solid 1px #e8e8e8",
    margin: "30px auto 0",
    [portraitOrientationQueryIPads]: {
      marginTop: "10px"
    }
  },
  differences: {
    margin: "28px 0 0 0",
    paddingLeft: "20px",
    "@media only screen and (max-width: 1420px)": {
      margin: "15px 0 15px 0"
    },
    "& li": {
      fontSize: "16px",
      color: "#373737",
      listStyle: "none",
      position: "relative",
      "@media only screen and (max-width: 1420px)": {
        fontSize: "14px"
      },
      "& img": {
        position: "absolute",
        left: -20,
        top: 3
      },
      "& + li": {
        marginTop: "16px",
        "@media only screen and (max-width: 1420px)": {
          marginTop: "9px"
        }
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
  scrollToIndex,
  accountType
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
      <ContinueButton
        handleClick={() => handleClick({ scrollToIndex, accountType })}
        name={scrollToIndex}
      >
        {buttonText}
      </ContinueButton>
    </div>
  </div>
);

export default withStyles(style)(AccountTypeCard);
