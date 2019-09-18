import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import cx from "classnames";

const StyledExpansionPanel = withStyles({
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

const StyledExpansionPanelSummary = withStyles({
  root: {
    minHeight: 60,
    "&$expanded": {
      minHeight: 60
    }
  },
  content: {
    width: "calc(100% - 100px)",
    overflow: "hidden",
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(ExpansionPanelSummary);

const StyledExpansionPanelDetails = withStyles(theme => ({
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
    fontSize: "16px",
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
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <>
        <StyledExpansionPanel
          square
          expanded={expanded === "panel-1"}
          onChange={() => this.handleChange("panel-1")}
        >
          <StyledExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              Can I come back later and complete the application?
            </div>
          </StyledExpansionPanelSummary>
          <StyledExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </StyledExpansionPanelDetails>
        </StyledExpansionPanel>
        <StyledExpansionPanel
          square
          expanded={expanded === "panel-2"}
          onChange={() => this.handleChange("panel-2")}
        >
          <StyledExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              How long will it take to get the account?
            </div>
          </StyledExpansionPanelSummary>
          <StyledExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </StyledExpansionPanelDetails>
        </StyledExpansionPanel>
        <StyledExpansionPanel
          square
          expanded={expanded === "panel-3"}
          onChange={() => this.handleChange("panel-3")}
        >
          <StyledExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              What if I need help with some fields?
            </div>
          </StyledExpansionPanelSummary>
          <StyledExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </StyledExpansionPanelDetails>
        </StyledExpansionPanel>
        <StyledExpansionPanel
          square
          expanded={expanded === "panel-4"}
          onChange={() => this.handleChange("panel-4")}
        >
          <StyledExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.text}>
              <HelpOutlineIcon className={classes.iconStyle} />
              How do I check the status on my submitted application?
            </div>
          </StyledExpansionPanelSummary>
          <StyledExpansionPanelDetails>
            <div className={cx(classes.text, classes.info)}>Some info</div>
          </StyledExpansionPanelDetails>
        </StyledExpansionPanel>
      </>
    );
  }
}

export default withStyles(style)(CommonQuestions);
