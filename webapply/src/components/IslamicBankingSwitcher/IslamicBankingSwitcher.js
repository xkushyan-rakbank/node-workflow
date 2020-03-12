import React, { useCallback, useContext } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import { connect } from "react-redux";
import cx from "classnames";

import { useStyles } from "./styled";
import { ReactComponent as ConventionalIcon } from "../../assets/icons/conventional.svg";
import { ReactComponent as IslamicIcon } from "../../assets/icons/islamic.svg";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { CONVENTIONAL, detailedAccountRoutesMap, ISLAMIC } from "../../constants";

const IslamicBankingSwitcher = ({ isIslamicBanking, accountType }) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const classes = useStyles({ isMobileNotificationActive });
  const pushHistory = useTrackingHistory();
  const handleClick = useCallback(
    islamicBanking => {
      pushHistory(detailedAccountRoutesMap[accountType][islamicBanking ? ISLAMIC : CONVENTIONAL]);
    },
    [pushHistory, accountType]
  );

  return (
    <ButtonGroup
      variant="contained"
      size="small"
      aria-label="small contained button group"
      classes={{ root: classes.root, grouped: classes.grouped }}
    >
      <Button
        classes={{
          root: cx(classes.buttonStyle, {
            [classes.active]: isIslamicBanking
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
            [classes.active]: !isIslamicBanking
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
  accountType: appConfigSelectors.getAccountType(state),
  isIslamicBanking: appConfigSelectors.getIsIslamicBanking(state)
});

export default connect(mapStateToProps)(IslamicBankingSwitcher);
