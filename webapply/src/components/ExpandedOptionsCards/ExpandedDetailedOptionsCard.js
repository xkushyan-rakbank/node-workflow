import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "@material-ui/core";
import plus from "../../assets/icons/rak-value-plus.svg";
import max from "../../assets/icons/rak-value-max.svg";
import check from "../../assets/icons/check_outline_ic.svg";

const style = {
  root: {
    position: "relative",
    display: "flex",
    flex: "1 1",
    flexDirection: "column",
    minWidth: "270px",
    maxHeight: "572px",
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
    paddingBottom: "30px",
    "@media only screen and (max-width: 1300px)": {
      paddingBottom: "10px"
    }
  },
  icon: {
    display: "flex",
    height: "80px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px"
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
      marginBottom: "10px"
    }
  },
  upgrade: {
    paddingTop: "5px",
    fontSize: "14px",
    fontStyle: "italic",
    textAlign: "center",
    color: "#86868b"
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

const ExpandedOptionsDetailedCard = ({
  classes,
  optionList,
  isIncluded,
  cost,
  value,
  href
}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <div className={classes.icon}>
        {value === "RAKvalue PLUS" ? (
          <img src={plus} alt="rak-plus" />
        ) : (
          <img src={max} alt="rak-max" />
        )}
      </div>
      <div className={classes.name}>{value}</div>
    </div>
    {optionList && (
      <ul className={classes.options}>
        {optionList.map(option => (
          <li key={option.text}>
            <img
              className={classes.listIcon}
              src={check}
              alt="check"
              height={16}
              width={16}
            />
            {option.text}
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
      {isIncluded ? "Included in RAKstarter" : "Available upgrade"}
    </div>
    <div
      className={classes.closeButton}
      onClick={() => console.log("not implemented yet")}
    />
  </div>
);

export default withStyles(style)(ExpandedOptionsDetailedCard);
