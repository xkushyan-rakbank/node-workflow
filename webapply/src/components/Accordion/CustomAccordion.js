import React, { useState } from "react";

import { Collapse, withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import cx from "classnames";

import { ReactComponent as Check } from "../../assets/icons/credit_score.svg";
import { useStyles } from "./styled";
import { ICONS, Icon } from "../Icons";

const AccordionPanel = withStyles({
  root: {
    borderTop: "1px solid #E6E6E6",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    padding: 0,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    margin: 0,
    "& .accordionTitle": {
      color: "#8D0C10",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "22px",
      margin: 0,
      letterSpacing: "0px",
      transition: "font-weight 0.25s ease-out"
    },
    "&$expanded": {
      margin: 0,
      fontWeight: 600,
      transition: "font-weight 0.25s ease-out",
      "& .activePanel": {
        display: "inline-block",
        width: "4px",
        height: "16px",
        backgroundColor: "#8D0C10",
        borderRadius: "2px"
      },
      "& .accordionTitle": {
        fontWeight: 600,
        paddingLeft: "15px",

        transition: "fontWeight 0.25s ease-in-out"
      }
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    flexDirection: "column",
    padding: 0,
    marginBottom: "24px"
  }
})(MuiAccordionDetails);

export const Accordion = ({ id, title, children, showDefinition, isCompleted = false }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState("");

  const transitionProps = {
    mountOnEnter: true,
    unmountOnExit: true
  };

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="accordion">
      <AccordionPanel
        expanded={expanded === id}
        onChange={handleChange(id)}
        square
        TransitionComponent={Collapse}
        TransitionProps={transitionProps}
      >
        <AccordionSummary className={classes.accordionSummary}>
          <div className={cx(classes.wrapper, classes.customAccordionWrapper)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="activePanel"></span>
              <p className="accordionTitle">{title}</p>
            </div>
            <div>
              {expanded === "taxDeclarations" && showDefinition}
              {isCompleted && <Check size="16px" className={classes.success} />}
              <Icon
                className={classes.expandIcon}
                alt="collapse-icon"
                name={expanded ? ICONS.arrowUp : ICONS.arrowDown}
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </AccordionPanel>
    </div>
  );
};
