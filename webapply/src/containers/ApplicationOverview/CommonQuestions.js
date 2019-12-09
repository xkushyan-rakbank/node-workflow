import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import { ICONS, Icon } from "../../components/Icons/Icon";
import arrowDown from "../../assets/icons/arrow-down.png";
import { mobileResolution } from "../../constants";

const style = {
  root: {
    minWidth: "550px",
    border: "none",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:nth-child(odd)": {
      backgroundColor: "rgba(239, 242, 244, .5)"
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minWidth: "100%"
    }
  },
  expanded: {},
  summaryRoot: {
    minHeight: 60,
    "&$expanded": {
      minHeight: 60
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      padding: "8px 16px"
    }
  },
  summaryContent: {
    width: "calc(100% - 100px)",
    overflow: "hidden",
    "&$expanded": {
      margin: "12px 0"
    }
  },
  detailsRoot: {
    padding: "16px",
    borderTop: "1px solid rgba(239, 242, 244, .5)",
    borderBottom: "1px solid rgba(239, 242, 244, .5)",
    fontSize: "16px",
    backgroundColor: "#fff"
  },
  iconSize: {
    width: "24px",
    height: "24px"
  },
  iconStyle: {
    position: "relative",
    top: "4px",
    marginRight: "20px"
  },
  text: {
    paddingBottom: "5px",
    fontSize: "16px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingBottom: 0
    }
  },
  textEllipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      whiteSpace: "normal",
      "& svg": {
        display: "none"
      }
    }
  },
  info: {
    paddingLeft: 10,
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingLeft: 0
    }
  }
};

class CommonQuestions extends React.Component {
  state = {
    expanded: ""
  };

  handleChange = name => {
    const { expanded } = this.state;
    const value = expanded === name ? "" : name;
    this.setState({ expanded: value });
  };

  render() {
    const { classes, data } = this.props;
    const { expanded } = this.state;

    return data.map(item => (
      <ExpansionPanel
        key={item.id}
        square
        expanded={expanded === item.id}
        onChange={() => this.handleChange(item.id)}
        classes={{ root: classes.root, expanded: classes.expanded }}
      >
        <ExpansionPanelSummary
          expandIcon={<img src={arrowDown} alt="arrow-down" className={classes.iconSize} />}
          aria-controls="panel1d-content"
          id="panel1d-header"
          classes={{
            root: classes.summaryRoot,
            content: classes.summaryContent,
            expanded: classes.expanded
          }}
        >
          <div className={cx(classes.text, classes.textEllipsis)}>
            <Icon
              name={ICONS.question}
              alt="question"
              className={cx(classes.iconStyle, classes.iconSize)}
            />
            {item.question}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
          <div className={cx(classes.text, classes.info)}>{item.answer}</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }
}

export default withStyles(style)(CommonQuestions);
