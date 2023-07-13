import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useStyles } from "./styled";
import routes from "../../routes";
import { applicationOverviewRoutesMap, ISLAMIC } from "../../constants";
import { getAccountType } from "../../store/selectors/appConfig";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

export const HeaderButtonGroup = () => {
  const classes = useStyles();
  const accountType = useSelector(getAccountType);
  const pushHistory = useTrackingHistory();
  const queryParams = useLocation().search;

  const handleRedirection = path => {
    pushHistory(path);
  };

  return (
    <div className={classes.trackNSwitchAccountBtnWrapper}>
      <Button
        style={{ marginRight: "12px" }}
        variant="outlined"
        className={classes.trackNSwitchAccountBtn}
        onClick={() => handleRedirection(routes.comeBackLogin)}
      >
        Track my application
      </Button>
      <Button
        variant="outlined"
        className={classes.trackNSwitchAccountBtn}
        onClick={() =>
          handleRedirection(applicationOverviewRoutesMap[accountType][ISLAMIC] + queryParams)
        }
      >
        Switch to RAKislamic
      </Button>
    </div>
  );
};
