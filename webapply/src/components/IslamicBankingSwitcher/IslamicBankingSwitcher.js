import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import { connect } from "react-redux";
import cx from "classnames";

import { useStyles } from "./styled";
import { ReactComponent as ConventionalIcon } from "../../assets/icons/conventional.svg";
import { ReactComponent as IslamicIcon } from "../../assets/icons/islamic.svg";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { updateIslamicType } from "../../store/actions/selectedAccountInfo";

const IslamicBankingSwitcher = ({ applicationInfo, updateIslamicType }) => {
  const classes = useStyles();
  const handleClick = islamicBanking => {
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
  updateIslamicType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IslamicBankingSwitcher);
