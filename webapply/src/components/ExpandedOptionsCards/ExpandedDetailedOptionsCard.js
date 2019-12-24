import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { ContainedButton } from "../Buttons/ContainedButton";
import check from "../../assets/icons/check_outline_ic.png";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { mobileResolution } from "../../constants";

const style = {
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
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minWidth: 250,
      padding: "40px 16px 25px 16px"
    }
  },
  title: {
    fontSize: "20px",
    borderBottom: "solid 1px #e8e8e8",
    paddingBottom: "30px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingBottom: 20
    }
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
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingBottom: 5
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
    fontWeight: "600",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingBottom: 20
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
  selectService,
  handleClick,
  disabled,
  id
}) => {
  const renderTitle = () =>
    accountType === "RAKstarter" && value === "RAKvalue PLUS"
      ? "Included in RAKstarter"
      : "Available upgrade";

  const { plus: Plus, max: Max } = useIconsByAccount();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.title}>
        <div className={classes.icon}>
          {value === "RAKvalue PLUS" ? (
            <Plus width={80} height={80} alt="rak-plus" />
          ) : (
            <Max width={80} height={80} alt="rak-max" />
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
        <Link href={href} className={classes.link} target="_blank">
          Read more
        </Link>
      </div>
      <div className={classes.cost}>
        {cost}
        <span>AED/ month</span>
      </div>
      <div className={classes.upgrade}>
        {selectService ? (
          <ContainedButton
            disabled={disabled}
            label={buttonLabel}
            className={classes.button}
            handleClick={() => handleClick(id)}
          />
        ) : (
          renderTitle()
        )}
      </div>
    </div>
  );
};

export default withStyles(style)(ExpandedOptionsDetailedCard);
