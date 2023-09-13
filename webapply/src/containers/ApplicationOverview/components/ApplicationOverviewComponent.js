import React from "react";
import cx from "classnames";
import { TwoSteps } from "./TwoSteps";
import { PreliminaryInformation } from "./PreliminaryInformation";
import { SectionSteps } from "../../../components/SectionSteps";
import { CommonQuestions } from "./CommonQuestions";
import { questions } from "./PreliminaryInformation/constants";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import { useStyles } from "../styled";

export const ApplicationOverviewComponent = () => {
  const classes = useStyles();
  return (
    <>
      <SectionSteps />
      <Accordion
        title={"You'll need the following documents"}
        id={"documentLanding"}
        classes={{
          accordionRoot: classes.landingAccordionRoot,
          accordionExpanded: classes.landingAccordionExpandedRoot,
          accordionSummaryContent: classes.landingAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.landingAccordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails,
          accordionIcon: classes.expandIcon
        }}
        expandedByDefault={true}
      >
        <TwoSteps withHeader />
      </Accordion>

      <Accordion
        title={"How-to video"}
        id={"how-to-video"}
        classes={{
          accordionRoot: classes.landingAccordionRoot,
          accordionExpanded: classes.landingAccordionExpandedRoot,
          accordionSummaryContent: classes.landingAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.landingAccordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails,
          accordionIcon: classes.expandIcon
        }}
      >
        <PreliminaryInformation />
      </Accordion>
      <div style={{ marginBottom: "50px" }}>
        <Accordion
          title={"Frequently asked questions"}
          id={"frequently_asked_questions"}
          classes={{
            accordionRoot: cx(classes.landingAccordionRoot, classes.noborder),
            accordionExpanded: classes.landingAccordionExpandedRoot,
            accordionSummaryContent: classes.landingAccordionSummaryContent,
            accordionSummaryContentExpanded: classes.landingAccordionSummaryContentExpanded,
            accordionDetails: classes.accordionDetails,
            accordionIcon: classes.expandIcon
          }}
        >
          <p className={classes.subTitle}>
            {"Here are the answers to some things you're probably wondering about"}
          </p>
          <CommonQuestions questions={questions} />
        </Accordion>
      </div>
    </>
  );
};
