import React from "react";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import routes from "../../../routes";
import { useStyles } from "./styled";

const Personas = [
  {
    key: "sole",
    title: "I’m a Sole Proprietor",
    subTitle: "I own this business",
    url: routes.applicantInfo,
    urlType: "2.0"
  },
  {
    key: "sole_llc",
    title: "I’m a Sole Proprietor with an LLC",
    subTitle: "I do business as a limited liability company (LLC)",
    url: routes.applicantInfo,
    urlType: "2.0"
  },
  {
    key: "others",
    title: "None of the above",
    subTitle:
      "I'm a partner in the business, have Power of Attorney, or am applying on behalf of someone else.",
    url: process.env.REACT_APP_BAU_URL || "/",
    urlType: "bau"
  }
];

export default function RoleSelectionComponent({ handleNavigation }) {
  const classes = useStyles();
  return (
    <div className={classes.container} data-testid="persona-selection">
      <div className={classes.section}>
        <SectionTitleWithInfo
          title={"Which best describes you?"}
          info="Tell us about your position within the business"
          smallInfo
        />
        <div className={classes.btnContainer}>
          {Personas.map(persona => {
            return (
              <div
                key={persona.key}
                className={classes.roleSelectionButton}
                onClick={() => handleNavigation(persona.url, persona.urlType)}
              >
                <div className={classes.avatar} />
                <div className={classes.buttonText}>
                  <div className={classes.title}>{persona.title}</div>
                  <span className={classes.subTitle}> {persona.subTitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
