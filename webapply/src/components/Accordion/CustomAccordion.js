import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Collapse, makeStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import cx from "classnames";

import { ReactComponent as Check } from "../../assets/icons/credit_score.svg";
import { ICONS, Icon } from "../Icons";
import { updateProspect } from "../../store/actions/appConfig";
import { isFieldTouched } from "../../store/selectors/appConfig";
import { getIsComeback } from "../../store/selectors/retrieveApplicantInfo";

const useStyles = makeStyles(theme => ({
  accordionRoot: {
    borderTop: "1px solid #E6E6E6",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  accordionExpanded: { margin: "auto !important" },
  accordionSummaryRoot: {
    marginBottom: -1,
    minHeight: 56,
    padding: 0
  },
  accordionSummaryContent: {
    margin: 0,
    "& .accordionTitle": {
      letterSpacing: "0px",
      transition: "font-weight 0.25s ease-out",
      "& .title": {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "22px",
        color: "#8D0C10",
        margin: 0
      },
      "& .subTitle": {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "28px",
        color: "#757575",
        margin: 0
      }
    }
  },

  accordionSummaryContentExpanded: {
    minHeight: "56px !important",
    margin: "0px !important",
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
  },
  accordionDetails: {
    flexDirection: "column",
    padding: 0,
    marginBottom: "24px"
  },
  accordionSummaryWrapper: {
    display: "flex",
    width: "100%"
  },
  customAccordionSummaryWrapper: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  expandIcon: {
    fill: "#BF0000",
    width: "20px",
    height: "10px"
  },
  success: {
    height: "11px",
    width: "14px",
    marginRight: "24px"
  }
}));

export const Accordion = ({
  id,
  title,
  children,
  showDefinition,
  isCompleted = false,
  subTitle,
  classes: extendedClasses,
  setFormFieldValue = () => { }
}) => {
  const dispatch = useDispatch();
  const isTouched = useSelector(isFieldTouched(id));
  const classes = useStyles({ classes: extendedClasses });
  const [expanded, setExpanded] = useState("");
  const isComeback = useSelector(getIsComeback);
  const transitionProps = {
    mountOnEnter: false,
    unmountOnExit: false
  };

  const handleChange = panel => (event, newExpanded) => {
    !isTouched && dispatch(updateProspect({ [`prospect.fields.${id}.touched`]: true }));
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setFormFieldValue(id, isCompleted);
  }, [id, isCompleted]);

  return (
    <div className="accordion">
      <MuiAccordion
        expanded={expanded === id}
        onChange={handleChange(id)}
        square
        TransitionComponent={Collapse}
        TransitionProps={transitionProps}
        classes={{ root: classes.accordionRoot, expanded: classes.accordionExpanded }}
      >
        <MuiAccordionSummary
          classes={{
            root: classes.accordionSummaryRoot,
            expanded: classes.accordionSummaryContentExpanded,
            content: classes.accordionSummaryContent
          }}
        >
          <div
            className={cx(classes.accordionSummaryWrapper, classes.customAccordionSummaryWrapper)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="activePanel"></span>
              <div className="accordionTitle">
                <p className="title">{title}</p>
                {subTitle && <p className="subTitle">{subTitle}</p>}
              </div>
            </div>
            <div>
              {expanded === "isTaxDeclarationCompleted" && showDefinition}
              {isCompleted && (isTouched || isComeback) && (
                <Check size="16px" className={classes.success} />
              )}
              <Icon
                className={classes.expandIcon}
                alt="collapse-icon"
                name={expanded ? ICONS.arrowUp : ICONS.arrowDown}
              />
            </div>
          </div>
        </MuiAccordionSummary>
        <MuiAccordionDetails classes={{ root: classes.accordionDetails }}>
          {children}
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};
