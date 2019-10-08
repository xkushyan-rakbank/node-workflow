import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import questionMark from "../../assets/icons/question-mark.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import cx from "classnames";

const style = {
  root: {
    minWidth: "550px",
    border: "none",
    boxShadow: "none",
    "@media only screen and (max-width: 991px)": {
      minWidth: "inherit"
    },
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
    }
  },
  expanded: {},
  summaryRoot: {
    minHeight: 60,
    "&$expanded": {
      minHeight: 60
    },
    "@media only screen and (max-width: 991px)": {
      minHeight: 30
    }
  },
  summaryContent: {
    width: "calc(100% - 100px)",
    overflow: "hidden",
    "@media only screen and (max-width: 991px)": {
      margin: "0"
    },
    "&$expanded": {
      margin: "12px 0"
    }
  },
  detailsRoot: {
    padding: "16px",
    borderTop: "1px solid rgba(239, 242, 244, .5)",
    borderBottom: "1px solid rgba(239, 242, 244, .5)",
    fontSize: "16px",
    backgroundColor: "#fff",
    "@media only screen and (max-width: 991px)": {
      padding: "8px"
    }
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
    "@media only screen and (max-width: 991px)": {
      fontSize: "12px",
      lineHeight: "15px"
    }
  },
  textEllipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  info: {
    paddingLeft: "10px"
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
    return (
      <>
        {data.length > 0 &&
          data.map(item => (
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
                  <img
                    src={questionMark}
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
          ))}
      </>
    );
  }
}

export default withStyles(style)(CommonQuestions);
