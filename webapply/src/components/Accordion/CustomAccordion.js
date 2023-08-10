import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Collapse, makeStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import cx from "classnames";

import { ReactComponent as Check } from "../../assets/icons/loadingGreen.svg";
import { ICONS, Icon } from "../Icons";
import { updateProspect } from "../../store/actions/appConfig";
import { isFieldTouched } from "../../store/selectors/appConfig";
import { getIsComeback } from "../../store/selectors/retrieveApplicantInfo";
import { ContexualHelp } from "../Notifications";

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
    minHeight: "56px!important",
    padding: 0
  },
  accordionSummaryContent: {
    margin: 0,
    "& .accordionTitle": {
      letterSpacing: "0px",
      "& .title": {
        display: "flex",
        alignItems: "center",
        gap: "8px",
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
      },
      "& .helperIcon": {
        width: "20px",
        height: "20px",
        fontSize: "1.25rem",
        color: "#525252",
        fontWeight: "400"
      }
    }
  },

  accordionSummaryContentExpanded: {
    marginTop: "0px !important",
    marginBottom: "0px !important",
    fontWeight: 500,
    "& .activePanel": {
      display: "inline-block",
      width: "4px",
      height: "16px",
      backgroundColor: "#8D0C10",
      borderRadius: "2px"
    },
    "& .accordionTitle": {
      fontWeight: 500,
      paddingLeft: "15px"
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
  accordionIcon: {
    fill: "#BF0000",
    width: "20px",
    height: "10px",
    color: "#BF0000",
    "& svg": {
      fill: "#BF0000"
    }
  },
  success: {
    height: "24px",
    width: "24px",
    marginRight: "8px"
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
  showHelperText,
  setFormFieldValue = () => {},
  expandedByDefault = false
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

  const byDefaultExpandedAccordion = ["documentLanding"];

  return (
    <div className="accordion">
      <MuiAccordion
        defaultExpanded={byDefaultExpandedAccordion.includes(id)}
        onChange={handleChange(id)}
        square
        TransitionComponent={Collapse}
        TransitionProps={transitionProps}
        classes={{ root: classes.accordionRoot, expanded: classes.accordionExpanded }}
      >
        <MuiAccordionSummary
          expandIcon={
            <Icon name={ICONS.arrowDown} alt="arrow-down" className={classes.expandIcon} />
          }
          classes={{
            root: classes.accordionSummaryRoot,
            expanded: classes.accordionSummaryContentExpanded,
            content: classes.accordionSummaryContent,
            expandIcon: classes.accordionIcon
          }}
        >
          <div
            className={cx(classes.accordionSummaryWrapper, classes.customAccordionSummaryWrapper)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="activePanel"></span>
              {isCompleted && (isTouched || isComeback) && (
                <Check size="16px" className={classes.success} />
              )}
              <div className="accordionTitle">
                <p className="title">
                  {title}
                  {showHelperText && (
                    <ContexualHelp
                      title={showHelperText}
                      placement="right"
                      isDisableHoverListener={false}
                    >
                      <HelpOutlineIcon className="helperIcon" />
                    </ContexualHelp>
                  )}
                </p>
                {subTitle && <p className="subTitle">{subTitle}</p>}
              </div>
            </div>
            <div>{expanded === "isTaxDeclarationCompleted" && showDefinition}</div>
          </div>
        </MuiAccordionSummary>
        <MuiAccordionDetails classes={{ root: classes.accordionDetails }}>
          {children}
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};
