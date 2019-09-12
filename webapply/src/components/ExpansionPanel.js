import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

const MyExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
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
})(ExpansionPanel);

const MyExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
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
    padding: theme.spacing(2)
  }
}))(ExpansionPanelDetails);

class ExpansionPanels extends React.Component {
  state = {
    expanded: ""
  };

  handleChange = ({ currentTarget }) => {
    const { expanded } = this.state;
    const value = expanded === currentTarget.name ? "" : currentTarget.name;
    this.setState({ expanded: value });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <MyExpansionPanel
          name="panel-1"
          square
          expanded={expanded === "panel-1"}
          onChange={e => this.handleChange(e)}
        >
          <MyExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography>{summary}</Typography>
          </MyExpansionPanelSummary>
          <MyExpansionPanelDetails>
            <Typography>{details}</Typography>
          </MyExpansionPanelDetails>
        </MyExpansionPanel>
      </div>
    );
  }
}

export default ExpansionPanels;
