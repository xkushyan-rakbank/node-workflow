import React from "react";
import { Button } from "@material-ui/core";

import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ReactComponent as NavigationLeft } from "../../../assets/icons/blackNavigationLeftArrow.svg";
import { useStyles } from "./styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import routes from "../../../routes";

export default function RoleSelectionComponent({ handleNavigation, personas }) {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();

  const handleRedirection = (path, replaceHistory = false) => {
    const state = { notClearSession: true };
    pushHistory(path, replaceHistory, state);
  };

  return (
    <div className={classes.container} data-testid="persona-selection">
      <div className={classes.section}>
        <div className={classes.trackButtonContainer}>
          <Button
            variant="outlined"
            className={classes.trackNSwitchAccountBtn}
            onClick={() => handleRedirection(routes.comeBackLogin)}
            data-testid="trackNSwitchAccountBtn"
          >
            Track my application
          </Button>
        </div>
        <SectionTitleWithInfo
          title={"What’s your role in the business?"}
          // info="Tell us about your role in the business"
          smallInfo
        />
        <div className={classes.btnContainer}>
          {personas?.map(persona => {
            return (
              <div
                key={persona.key}
                data-testid="persona-item"
                className={classes.roleSelectionButton}
                onClick={() => handleNavigation(persona, persona.urlType)}
              >
                <div className={classes.buttonText}>
                  <div className={classes.title} data-testid="persona-title">
                    {persona.title}
                  </div>
                  {persona.subTitle.length === 1 && (
                    <span data-testid="persona-subtitle" className={classes.subTitle}>
                      {" "}
                      {persona.subTitle[0]}
                    </span>
                  )}
                  {persona.subTitle.length > 1 && (
                    <ul className={classes.subTitleList}>
                      {persona.subTitle.map((persona, index) => (
                        <li
                          data-testid="persona-subtitle-list"
                          className={classes.subTitle}
                          key={index}
                        >
                          {persona}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <NavigationLeft key="navigationArrowLeft" alt="blackArrowLeft" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
