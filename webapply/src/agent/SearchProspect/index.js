import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextInput from "../../components/InputField/TextInput";
import SearchButton from "../../components/Buttons/SearchButton";
import PureSelect from "../../components/InputField/PureSelect";
import Grid from "@material-ui/core/Grid";
import SearchResult from "./../SearchResult/index";
import { validateForm } from "../../utils/validate";
import { searchApplications } from "./../../store/actions/searchProspect";
import * as inputSelectors from "./../../store/selectors/input";
import * as appConfigSelectors from "./../../store/selectors/appConfig";
import * as loginSelector from "./../../store/selectors/loginSelector";
import * as getSearchResult from "./../../store/selectors/searchProspect";
import routes from "../../routes";
import { styles } from "./styled";
import { titles } from "./constants";

class SearchProspect extends React.Component {
  UNSAFE_componentWillMount() {
    if (!this.props.checkLoginStatus) {
      return this.props.history.push(routes.login);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    validateForm(event);
    const isValid = event.target.checkValidity();
    if (isValid) {
      this.props.searchApplications(this.props.inputParam);
    }
  };

  render() {
    const {
      classes,
      fullName,
      mobileNo,
      email,
      raktrackNumber,
      tradeLicenseNo,
      searchResults
    } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>{titles.SEARCH_APPLICATION_TITLE}</h2>

        <form onSubmit={this.handleSubmit} noValidate>
          <TextInput id="Search.fullName" />
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <TextInput
                id="Search.mobileNo"
                selectId="Search.countryCode"
                select={<PureSelect id="Search.countryCode" combinedSelect defaultValue="UAE" />}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.email" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.raktrackNumber" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.tradeLicenseNo" />
            </Grid>
          </Grid>

          <div className="linkContainer">
            <SearchButton
              disabled={!fullName && !mobileNo && !raktrackNumber && !email && !tradeLicenseNo}
            />
          </div>
          {searchResults.searchResult && (
            <SearchResult searchResults={searchResults.searchResult} />
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullName: inputSelectors.getInputValueById(state, "Search.fullName"),
  countryCode: inputSelectors.getInputValueById(state, "Search.countryCode"),
  mobileNo: inputSelectors.getInputValueById(state, "Search.mobileNo"),
  raktrackNumber: inputSelectors.getInputValueById(state, "Search.raktrackNumber"),
  tradeLicenseNo: inputSelectors.getInputValueById(state, "Search.tradeLicenseNo"),
  email: inputSelectors.getInputValueById(state, "Search.email"),
  inputParam: appConfigSelectors.getSearchInfo(state),
  searchResults: getSearchResult.getSearchResult(state),
  checkLoginStatus: loginSelector.checkLoginStatus(state)
});

const mapDispatchToProps = {
  searchApplications
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchProspect)
);
