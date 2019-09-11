import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  sectionTitleIndent: {
    marginBottom: "24px"
  },
  topIndent: {
    marginTop: "40px"
  }
};

class ApplicationOverview extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <h3>Two easy steps</h3>
        <p>
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>
      </>
    );
  }
}

export default withStyles(style)(ApplicationOverview);
