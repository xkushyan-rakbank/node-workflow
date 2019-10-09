import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import * as appConfigSelectors from "../store/selectors/appConfig";
import { updateProspect } from "../store/actions/appConfig";
import { connect } from "react-redux";
import cx from "classnames";

const styles = {
  root: {
    position: "absolute",
    top: "30px",
    right: "40px",
    zIndex: 21, // 20 still not visible
    width: "266px",
    borderRadius: "6px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)"
  },
  buttonStyle: {
    width: "50%",
    padding: "2px 8px",
    outline: "none ",
    fontSize: "16px",
    textTransform: "none",
    textAlign: "center",
    backgroundColor: "#000",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)"
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
const IslamicBankingSwitcher = ({ classes, updateProspect, applicationInfo }) => {
  const handleClick = islamicBanking =>
    updateProspect({
      "prospect.applicationInfo.islamicBanking": islamicBanking
    });

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
        RAKislamic
      </Button>
    </ButtonGroup>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IslamicBankingSwitcher)
);
