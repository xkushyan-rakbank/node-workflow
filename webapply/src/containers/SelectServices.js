import React from "react";
import { withStyles } from "@material-ui/core";
import SubmitApplication from "./SubmitApplication";

const style = {};

class SelectServices extends React.Component {
  state = {
    canSubmit: true
  };

  render() {
    if (this.state.canSubmit) {
      return <SubmitApplication />;
    }
    return (
      <>
        <h2>Services for your account</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>
      </>
    );
  }
}

export default withStyles(style)(SelectServices);
