import React, { useState } from "react";
import cx from "classnames";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { ICONS, Icon } from "../../../../components/Icons/Icon";

import { useStyles } from "./styled";

export const CommonQuestions = ({ questions }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);
  const classes = useStyles();

  const handleChange = name => () => {
    const value = expandedPanel === name ? null : name;
    setExpandedPanel(value);
  };

  return questions.map(question => (
    <ExpansionPanel
      key={question.id}
      square
      expanded={expandedPanel === question.id}
      onChange={handleChange(question.id)}
      classes={{ root: classes.root, expanded: classes.expanded }}
    >
      <ExpansionPanelSummary
        expandIcon={<Icon name={ICONS.arrowDown} alt="arrow-down" className={classes.iconSize} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
        classes={{
          root: classes.summaryRoot,
          content: classes.summaryContent,
          expanded: classes.expanded
        }}
      >
        <div className={cx(classes.text, classes.textEllipsis)}>{question.question}</div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
        <div className={cx(classes.text, classes.info)}>{question.answer.__html}</div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
};
