import React from "react";
import Grid from "@material-ui/core/Grid";
import UICheckbox from "../InputField/Checkbox";

class PoliticallyExposedPersonQuestions extends React.Component {
  state = {
    isHasRelativeGovtPosition: false
  };

  render() {
    return (
      <Grid container item xs={12} direction="row">
        <UICheckbox
          value={this.state.isHasRelativeGovtPosition}
          onChange={({ target }) => this.setState({ isHasRelativeGovtPosition: target.checked })}
          label="This Person or this person's relative (by relation or law) holds/has held a position with the Government/ Government owned company/political organization"
        />
      </Grid>
    );
  }
}

export default PoliticallyExposedPersonQuestions;
