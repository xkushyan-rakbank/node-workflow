import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import {
  getInputValueById,
  getFieldConfigById,
  getInputNameById
} from "../../store/selectors/input";
import { InfoTitle } from "./../Notifications";
import { updateProspect } from "../../store/actions/appConfig";
import { getOptionsForSubId } from "../../utils/getInputSubOptions";

class Industry extends React.Component {
  componentDidUpdate(prevProps) {
    const { industryValue, industryConfig, industrySubCatName } = this.props;
    if (prevProps.industryValue.length > industryValue.length) {
      const subOptionsConfig = getOptionsForSubId(industryValue, industryConfig);
      const subOptionsValues = subOptionsConfig.map(option => option.key);

      this.props.updateProspect({ [industrySubCatName]: subOptionsValues });
    }
  }

  render() {
    const { industryValue, industryConfig } = this.props;
    const subOptions = getOptionsForSubId(industryValue, industryConfig);

    return (
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect id="OkycIndus.industry" multiple indexes={[0, 0]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect
            disabled={isEmpty(industryValue)}
            subOptions={subOptions}
            id="OkycIndus.subCategory"
            multiple
            indexes={[0, 0]}
          />
        </Grid>

        <InfoTitle title="These should be the same as in your Trade License. You can select multiple industries." />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  industryValue: getInputValueById(state, "OkycIndus.industry", [0, 0]),
  industryConfig: getFieldConfigById(state, "OkycIndus.industry"),
  industrySubCatName: getInputNameById(state, "OkycIndus.subCategory", [0, 0])
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Industry);
