import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { useFormikContext } from "formik";
import { isEmpty } from "lodash";
import { TitleWithHorizontalLine } from "../TitleWithHorizontalLine";
import { useStyles } from "./styled";
import { ICONS, Icon } from "../Icons";
import { log } from "../../utils/loggger";
export const Accordion = props => {
  const formik = useFormikContext();
  const classes = useStyles();
  const labelsConstant = [];
  const [formLabels, setlabels] = React.useState([]);
  const [expanded, setExpanded] = React.useState(true);
  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
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
  React.useEffect(() => {
    extractLabels(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (!isEmpty(formik.errors))
      formLabels.forEach(element => {
        if (formik.errors[element.split(".")[0]] !== undefined) {
          setExpanded(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);
  return (
    <div className="accordion" data-testid="accordion">
      <ExpansionPanel className="panel" expanded={expanded} onChange={handleChange}>
        <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className={classes.wrapper}>
            <TitleWithHorizontalLine>{props.title}</TitleWithHorizontalLine>
            <div className={classes.iconWrapper}>
              <Icon
                className="smallIcon"
                alt="collapse-icon"
                name={expanded ? ICONS.minimizeChat : ICONS.arrowDown}
              />
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
