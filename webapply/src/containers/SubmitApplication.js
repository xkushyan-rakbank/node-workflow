import React from "react";
import { withStyles } from "@material-ui/core";
import Checkbox from "../components/InputField/Checkbox";
import Button from "../components/Buttons/SubmitButton";

const style = {
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    }
  },
  divider: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    marginBottom: "24px"
  }
};

class SubmitApplication extends React.Component {
  state = {
    canSubmit: false
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <h2>Submit application</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>

        <div className={classes.divider} />
        <div className={classes.checkboxesWrapper}>
          <Checkbox label="I confirm that the information provided is true and complete" />
          <Checkbox
            label={
              <div>
                I agree with RakBank’s <a href="#">terms and conditions</a>
              </div>
            }
          />
          <Checkbox label="I want to receive marketing and promotional communication from RakBank" />
        </div>

        <Button label="Submit" />
      </>
    );
  }
}

export default withStyles(style)(SubmitApplication);
