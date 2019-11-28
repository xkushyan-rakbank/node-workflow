import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { ContainedButton } from "../../../../../components/Buttons/ContainedButton";

const StyledContainedButton = withStyles({
  buttonStyle: {
    height: "auto",
    padding: "3px 0",
    border: "1px solid #373737",
    boxShadow: "none",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#000",
      "& span": {
        color: "#fff"
      }
    }
  },
  labelStyle: {
    display: "block",
    color: "#373737",
    fontSize: "14px",
    textAlign: "center"
  }
})(ContainedButton);

const style = {
  root: {
    position: "relative",
    display: "flex",
    flex: "1 1",
    flexDirection: "column",
    minWidth: "270px",
    maxHeight: "340px",
    margin: "10px",
    padding: "40px 20px 25px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    "&:hover": {
      borderColor: "#000"
    },
    "&:hover $closeButton": {
      display: "block"
    },
    "@media only screen and (max-width: 1300px)": {
      maxHeight: "220px",
      padding: "10px 20px 10px 20px"
    }
  },
  title: {
    fontSize: "20px",
    borderBottom: "solid 1px #e8e8e8",
    paddingBottom: "20px",
    "@media only screen and (max-width: 1300px)": {
      paddingBottom: "10px"
    }
  },
  name: {
    fontWeight: 600,
    textAlign: "center"
  },
  value: {
    position: "relative",
    display: "inline-block",
    marginLeft: "16px",
    padding: "3px 10px",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#ea2925",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.15)",
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: "-6px",
      width: 0,
      height: 0,
      transform: "translateY(-50%)",
      borderStyle: "solid",
      borderWidth: "8px 12px 8px 0",
      borderColor: "transparent #ea2925 transparent transparent"
    }
  },
  cost: {
    paddingTop: "10px",
    fontSize: "14px",
    color: "#c6c6cc",
    textAlign: "center",
    "& span": {
      marginLeft: "5px"
    }
  },
  options: {
    paddingLeft: "20px",
    fontSize: "20px",
    "@media only screen and (max-width: 1300px)": {
      "& li": {
        fontSize: "16px"
      },
      margin: "5px 0"
    },
    "& li:not(:last-child)": {
      marginBottom: "20px",
      "@media only screen and (max-width: 1300px)": {
        marginBottom: "5px"
      }
    }
  },
  link: {
    fontSize: "14px",
    color: "#c6c6cc",
    textDecoration: "underline"
  },
  linkWrapper: {
    marginBottom: "40px",
    "@media only screen and (max-width: 1300px)": {
      marginBottom: "10px"
    }
  },
  included: {
    fontSize: "16px",
    textAlign: "center"
  },
  applyButton: {
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    top: "-19px",
    right: "-19px",
    display: "none",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 5px 10px 0 rgba(158, 158, 158, 0.5)",
    cursor: "pointer",
    "&::after, &::before": {
      content: "''",
      position: "absolute",
      top: "19px",
      left: "7px",
      width: "25px",
      height: "2px",
      backgroundColor: "#000"
    },
    "&::after": {
      transform: "rotate(45deg)"
    },
    "&::before": {
      transform: "rotate(-45deg)"
    }
  }
};

const ExpandedOptionsCard = ({ classes, optionList, isIncluded, cost, value, href }) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <div className={classes.name}>
        RAKvalue
        <span className={classes.value}>{value}</span>
      </div>
      <div className={classes.cost}>
        {cost}
        <span>AED/ month</span>
      </div>
    </div>
    {optionList && (
      <ul className={classes.options}>
        {optionList.map(option => (
          <li key={option.text}>{option.text}</li>
        ))}
      </ul>
    )}
    <div className={classes.linkWrapper}>
      <Link href={href} className={classes.link}>
        Read more
      </Link>
    </div>
    <div>
      {isIncluded ? (
        <div className={classes.included}>Included with your RAKstarter</div>
      ) : (
        <div className={classes.applyButton}>
          <StyledContainedButton
            label="Apply with MAX"
            handleClick={() => console.log("not implemented yet")}
          />
        </div>
      )}
    </div>
    <div className={classes.closeButton} onClick={() => console.log("not implemented yet")} />
  </div>
);

export default withStyles(style)(ExpandedOptionsCard);
