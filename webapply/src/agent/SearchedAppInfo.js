import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import validateForm from "../utils/validate";
import * as getSearchResult from "./../store/selectors/searchProspect";

const styles = {
  baseForm: {
    maxWidth: "612px"
  }
};

class SearchedAppInfo extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    window.scroll(0, 0);
    validateForm(event);
    const isValid = event.target.checkValidity();
    if (isValid) {
      this.props.searchApplications(this.props.inputParam);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>Application Details</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This is the third
          sentence.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: getSearchResult.getSearchResult(state)
});

const mapDispatchToProps = {};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchedAppInfo)
);
