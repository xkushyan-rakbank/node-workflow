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
import { setAccordionStatus } from "../../store/actions/appConfig";
import { getAccordionStatuses } from "../../store/selectors/appConfig";
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
      },
      "& .expandedDescription": {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "18px",
        color: "#757575",
        margin: 0,
        [theme.breakpoints.up("sm")]: {
          fontSize: "16px",
          lineHeight: "24px"
        }
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
      fontWeight: 500
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
  expandedByDefault = false,
  accordionRef,
  expandedDescription
}) => {
  const dispatch = useDispatch();
  const classes = useStyles({ classes: extendedClasses });
  const [expanded, setExpanded] = useState("");
  const transitionProps = {
    mountOnEnter: false,
    unmountOnExit: false
  };
  const accordionStatuses = useSelector(getAccordionStatuses);
  const statuses = JSON.parse(accordionStatuses);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    if (!statuses[id] && isCompleted) {
      const updatedStatuses = {};
      updatedStatuses[id] = isCompleted;
      dispatch(setAccordionStatus(updatedStatuses));
    }
  };

  useEffect(() => {
    setFormFieldValue(id, isCompleted);
    const updatedStatuses = {};
    updatedStatuses[id] = isCompleted;
    dispatch(setAccordionStatus(updatedStatuses));
  }, [id, isCompleted]);

  const byDefaultExpandedAccordion = [
    "documentLanding",
    "companyInformation",
    "stakeholderInformation",
    "productInformation",
    "codesBankUseReview",
    "checks"
  ];

  const expandedDescriptionView = [
    "isSelectPackage",
    "preferences",
    "authorizations",
    "communication",
    "codesBankUse"
  ];

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
          ref={accordionRef}
        >
          <div
            className={cx(classes.accordionSummaryWrapper, classes.customAccordionSummaryWrapper)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="activePanel"></span>
              {isCompleted && statuses[id] && <Check size="16px" className={classes.success} />}
              <div className="accordionTitle">
                <div className="title">
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
                </div>
                {subTitle && <p className="subTitle">{subTitle}</p>}
                {expandedDescriptionView.includes(expanded) && expandedDescription && (
                  <p className="expandedDescription">{expandedDescription}</p>
                )}
              </div>
            </div>
            <div>
              {(expanded === "isTaxDeclarationCompleted" ||
                expanded === "stakeholderTaxDeclarationSection") &&
                showDefinition}
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
