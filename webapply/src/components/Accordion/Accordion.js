import React, { useEffect, useState } from "react";

import { withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useFormikContext } from "formik";
import { isEmpty } from "lodash";

import { TitleWithHorizontalLine } from "../TitleWithHorizontalLine";
import { ReactComponent as Check } from "../../assets/icons/credit_score.svg";
import { useStyles } from "./styled";
import { ICONS, Icon } from "../Icons";
import { log } from "../../utils/loggger";

export const Accordion = props => {
  const formik = useFormikContext();
  const classes = useStyles();
  const labelsConstant = [];
  const [formLabels, setlabels] = React.useState([]);
  const [expanded, setExpanded] = useState(props.custom ? false : true);

  const Accordion = withStyles({
    root: {
      borderTop: props.custom ? "1px solid #E6E6E6" : "none",
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
        transition: "font-weight .4s ease-in-out"
      },
      "&$expanded": {
        margin: 0,
        fontWeight: 600,
        transition: ".4s ease-in-out",
        "& .activePanel": {
          display: "inline-block",
          width: "4px",
          height: "16px",
          backgroundColor: "#8D0C10",
          borderRadius: "2px"
        },
        "& .accordionTitle": {
          fontWeight: 600,
          paddingLeft: "15px"
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
  const handleChange = event => {
    console.log("handleChange click");
    setExpanded(!expanded);
  };

  const extractLabels = props => {
    try {
      if (Array.isArray(props)) {
        props.forEach(element => {
          if (element.props !== undefined && element.props.name !== undefined) {
            labelsConstant.push(element.props.name);
          } else {
            if (element.props !== undefined && element.props.children !== undefined) {
              extractLabels(element.props.children);
            }
          }
        });
      }
      if (props.children !== undefined) {
        if (Array.isArray(props.children)) {
          extractLabels(props.children);
        } else {
          extractLabels(props.children.props.children);
        }
      }
      if (labelsConstant.length > 0) setlabels(labelsConstant);
    } catch (error) {
      log(error);
    }
  };

  useEffect(() => {
    extractLabels(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(formik.errors))
      formLabels.forEach(element => {
        if (formik.errors[element.split(".")[0]] !== undefined) {
          setExpanded(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  const expandedAccordionIcon = props.custom ? ICONS.arrowUp : ICONS.minimizeChat;

  return (
    <div className="accordion">
      <Accordion className="panel" expanded={expanded} onChange={handleChange} square>
        <AccordionSummary aria-controls="panel1a-content" className={classes.accordionSummary}>
          <div className={classes.wrapper}>
            {props.custom ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="activePanel"></span>
                <p className="accordionTitle">{props.title}</p>
              </div>
            ) : (
              <TitleWithHorizontalLine>{props.title}</TitleWithHorizontalLine>
            )}
            <div className={props.custom ? "" : classes.iconWrapper}>
              {props.custom && <Check size="16px" className={classes.success} />}
              <Icon
                className={props.custom ? classes.expandIcon : "smallIcon"}
                alt="collapse-icon"
                name={expanded ? expandedAccordionIcon : ICONS.arrowDown}
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </div>
  );
};
