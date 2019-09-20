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
    fontSize: "16px"
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
            <StyledExpansionPanel
              key={item.id}
              square
              expanded={expanded === item.id}
              onChange={() => this.handleChange(item.id)}
            >
              <StyledExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <div className={cx(classes.text, classes.textEllipsis)}>
                  <HelpOutlineIcon className={classes.iconStyle} />
                  {item.question}
                </div>
              </StyledExpansionPanelSummary>
              <StyledExpansionPanelDetails>
                <div className={cx(classes.text, classes.info)}>
                  {item.answer}
                </div>
              </StyledExpansionPanelDetails>
            </StyledExpansionPanel>
          ))}
      </>
    );
  }
}

export default withStyles(style)(CommonQuestions);
