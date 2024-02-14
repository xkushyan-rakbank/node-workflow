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
    /* istanbul ignore next @preserve */
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
      data-testid="common-questions-wrapper"
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
        data-testid="common-questions"
      >
        <div className={classes.text} data-testid="common-questions-label">
          {question.question}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
        <div className={cx(classes.text, classes.info)} data-testid="common-questions-desc">
          {question.answer.__html}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
};
