import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import { connect } from "react-redux";
import cx from "classnames";

import { ReactComponent as ConventionalIcon } from "../../assets/icons/conventional.svg";
import { ReactComponent as IslamicIcon } from "../../assets/icons/islamic.svg";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { updateProspect } from "../../store/actions/appConfig";
import { updateIslamicType } from "../../store/actions/selectedAccountInfo";
import { mobileResolution } from "../../constants/index";

const styles = {
  root: {
    position: "absolute",
    top: "30px",
    right: "40px",
    zIndex: 21, // 20 still not visible
    width: "266px",
    borderRadius: "6px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      padding: "30px 16px",
      left: 0,
      top: "100vh",
      transform: "translateY(-100%)",
      boxShadow: "none",
      width: "100%",
      flexWrap: "wrap",
      display: "flex",
      boxSizing: "border-box"
    }
  },
  buttonStyle: {
    width: "50%",
    padding: "2px 8px",
    outline: "none ",
    fontSize: "16px",
    textTransform: "none",
    textAlign: "center",
    backgroundColor: "#000",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)",
    "& svg": {
      display: "none"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      width: "100%",
      borderRadius: "8px!important",
      border: "0!important",
      height: 72,
      marginTop: 10,
      padding: "2px 20px",
      "& svg": {
        display: "inline-block",
        verticalAlign: "inline-block",
        marginRight: 20,
        width: 32,
        height: 32,
        "& path": {
          stroke: "currentColor"
        }
      },
      "& > span": {
        justifyContent: "flex-start",
        lineHeight: "32px"
      }
    }
  },
  active: {
    backgroundColor: "#fff",
    "& $labelStyle": {
      color: "#373737"
    }
  },
  labelStyle: {
    textAlign: "center",
    color: "#ffffff"
  }
};

const IslamicBankingSwitcher = ({
  classes,
  updateProspect,
  applicationInfo,
  updateIslamicType
}) => {
  const handleClick = islamicBanking => {
    updateProspect({
      "prospect.applicationInfo.islamicBanking": islamicBanking
    });

    updateIslamicType(islamicBanking);
  };

  return (
    <ButtonGroup
      variant="contained"
      size="small"
      aria-label="small contained button group"
      classes={{ root: classes.root }}
    >
      <Button
        classes={{
          root: cx(classes.buttonStyle, {
            [classes.active]: applicationInfo.islamicBanking
          }),
          label: classes.labelStyle
        }}
        onClick={() => handleClick(false)}
      >
        <ConventionalIcon />
        Conventional
      </Button>
      <Button
        classes={{
          root: cx(classes.buttonStyle, {
            [classes.active]: !applicationInfo.islamicBanking
          }),
          label: classes.labelStyle
        }}
        onClick={() => handleClick(true)}
      >
        <IslamicIcon />
        RAKislamic
      </Button>
    </ButtonGroup>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

const mapDispatchToProps = {
  updateProspect,
  updateIslamicType
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IslamicBankingSwitcher)
);
