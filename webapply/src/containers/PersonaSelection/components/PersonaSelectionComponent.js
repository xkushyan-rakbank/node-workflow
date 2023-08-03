import React from "react";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ReactComponent as NavigationLeft } from "../../../assets/icons/blackNavigationLeftArrow.svg";
import { useStyles } from "./styled";

export default function RoleSelectionComponent({ handleNavigation, personas }) {
  const classes = useStyles();
  return (
    <div className={classes.container} data-testid="persona-selection">
      <div className={classes.section}>
        <SectionTitleWithInfo
          title={"Let's get to know you"}
          info="Tell us about your role in the business"
          smallInfo
        />
        <div className={classes.btnContainer}>
          {personas?.map(persona => {
            return (
              <div
                key={persona.key}
                className={classes.roleSelectionButton}
                onClick={() => handleNavigation(persona, persona.urlType)}
              >
                <div className={classes.buttonText}>
                  <div className={classes.title}>{persona.title}</div>
                  {persona.subTitle.length === 1 && (
                    <span className={classes.subTitle}> {persona.subTitle[0]}</span>
                  )}
                  {persona.subTitle.length > 1 && (
                    <ul className={classes.subTitleList}>
                      {persona.subTitle.map((persona, index) => (
                        <li className={classes.subTitle} key={index}>
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
