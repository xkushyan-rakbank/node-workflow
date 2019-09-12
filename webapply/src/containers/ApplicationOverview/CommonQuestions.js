import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import cx from "classnames";

const MyExpansionPanel = withStyles({
  root: {
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
    }
  },
  expanded: {}
})(ExpansionPanel);

const MyExpansionPanelSummary = withStyles({
  root: {
    minHeight: 60,
    "&$expanded": {
      minHeight: 60
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(ExpansionPanelSummary);

const MyExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(239, 242, 244, .5)",
    borderBottom: "1px solid rgba(239, 242, 244, .5)",
    fontSize: "16px",
    backgroundColor: "#fff"
  }
}))(ExpansionPanelDetails);

const style = {
  iconStyle: {
    position: "relative",
    top: "4px",
    marginRight: "20px",
    fontSize: "23px",
    color: "#888888"
  },
  text: {
    paddingBottom: "5px",
    fontSize: "16px"
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
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <>
        <MyExpansionPanel
          square
          expanded={expanded === "panel-1"}
          onChange={() => this.handleChange("panel-1")}
        >
          <MyExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              Can I come back later and complete the application?
            </div>
          </MyExpansionPanelSummary>
          <MyExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </MyExpansionPanelDetails>
        </MyExpansionPanel>
        <MyExpansionPanel
          square
          expanded={expanded === "panel-2"}
          onChange={() => this.handleChange("panel-2")}
        >
          <MyExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              How long will it take to get the account?
            </div>
          </MyExpansionPanelSummary>
          <MyExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </MyExpansionPanelDetails>
        </MyExpansionPanel>
        <MyExpansionPanel
          square
          expanded={expanded === "panel-3"}
          onChange={() => this.handleChange("panel-3")}
        >
          <MyExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              What if I need help with some fields?
            </div>
          </MyExpansionPanelSummary>
          <MyExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </MyExpansionPanelDetails>
        </MyExpansionPanel>
        <MyExpansionPanel
          square
          expanded={expanded === "panel-4"}
          onChange={() => this.handleChange("panel-4")}
        >
          <MyExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              How do I check the status on my submitted application?
            </div>
          </MyExpansionPanelSummary>
          <MyExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </MyExpansionPanelDetails>
        </MyExpansionPanel>
      </>
    );
  }
}

export default withStyles(style)(CommonQuestions);
