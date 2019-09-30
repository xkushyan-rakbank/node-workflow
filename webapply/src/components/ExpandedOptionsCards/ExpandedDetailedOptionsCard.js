import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import { Link } from "@material-ui/core";
import ContinueButton from "../Buttons/ContainedButton";
import plus from "../../assets/icons/rak-value-plus.png";
import max from "../../assets/icons/rak-value-max.png";
import check from "../../assets/icons/check_outline_ic.png";

const style = {
  root: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    minWidth: "270px",
    maxHeight: "572px",
    margin: "10px",
    padding: "40px 20px 25px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    "@media only screen and (max-width: 1300px)": {
      flexGrow: 0,
      maxHeight: "220px",
      padding: "10px 20px 10px 20px"
    },
    "@media only screen and (max-height: 800px)": {
      padding: "10px 20px 10px 20px"
    }
  },
  title: {
    fontSize: "20px",
    borderBottom: "solid 1px #e8e8e8",
    paddingBottom: "30px",
    "@media only screen and (max-width: 1300px)": {
      paddingBottom: "10px",
      fontSize: "18px"
    },
    "@media only screen and (max-height: 800px)": {
      paddingBottom: "10px"
    }
  },
  icon: {
    display: "flex",
    height: "80px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
    "@media only screen and (max-width: 1300px)": {
      display: "none"
    }
  },
  name: {
    fontWeight: 600,
    textAlign: "center"
  },
  cost: {
    paddingTop: "25px",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    "& span": {
      marginLeft: "5px"
    },
    "@media only screen and (max-width: 1300px)": {
      paddingTop: "10px"
    }
  },
  options: {
    paddingLeft: "20px",
    fontSize: "16px",
    "& li": {
      position: "relative",
      listStyleType: "none"
    },
    "@media only screen and (max-width: 1300px)": {
      "& li": {
        fontSize: "16px"
      },
      margin: "5px 0"
    },
    "& > li:not(:last-child)": {
      marginBottom: "20px",
      "@media only screen and (max-width: 1300px)": {
        marginBottom: "5px"
      }
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
    },
    "@media only screen and (max-width: 1300px)": {
      display: "none"
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
    "@media only screen and (max-width: 1300px)": {
      paddingBottom: "10px"
    }
  },
  upgrade: {
    paddingTop: "5px",
    fontSize: "14px",
    fontStyle: "italic",
    textAlign: "center",
    color: "#86868b"
  },
  indent: {
    marginBottom: "6px"
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
};

const ExpandedOptionsDetailedCard = ({
  classes,
  optionList,
  isIncluded,
  cost,
  value,
  href,
  accountType,
  className,
  buttonLabel,
  selectService
}) => {
  const renderTitle = () =>
    accountType === "RAKStarter" && value === "RAKvalue PLUS"
      ? "Included in RAKstarter"
      : "Available upgrade";

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.title}>
        <div className={classes.icon}>
          {value === "RAKvalue PLUS" ? (
            <img width={80} height={80} src={plus} alt="rak-plus" />
          ) : (
            <img width={80} height={80} src={max} alt="rak-max" />
          )}
        </div>
        <div className={classes.name}>{value}</div>
      </div>
      {optionList && (
        <ul className={classes.options}>
          {optionList.map(option => (
            <li key={option.text}>
              <img className={classes.listIcon} src={check} alt="check" height={16} width={16} />
              <div
                className={cx("text", classes.indent)}
                dangerouslySetInnerHTML={{ __html: option.text }}
              />
              {option.items && (
                <ul className={classes.nestedOptions}>
                  {option.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className={classes.linkWrapper}>
        <Link href={href} className={classes.link}>
          Read more
        </Link>
      </div>
      <div className={classes.cost}>
        {cost}
        <span>AED/ month</span>
      </div>
      <div className={classes.upgrade}>
        {selectService ? (
          <ContinueButton className={classes.button} label={buttonLabel} />
        ) : (
          renderTitle()
        )}
      </div>
    </div>
  );
};

export default withStyles(style)(ExpandedOptionsDetailedCard);
