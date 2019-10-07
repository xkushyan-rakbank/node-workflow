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
import InfoTitle from "../InfoTitle";
import { updateProspect } from "../../store/actions/appConfig";

class Industry extends React.Component {
  state = {
    categoryCount: 0
  };

  componentDidUpdate(prevProps) {
    const { industryValue, industryConfig, industrySubCatName } = this.props;
    if (prevProps.industryValue.length > industryValue.length) {
      const subOptionsConfig = this.renderOptionsForSubId(industryValue, industryConfig);
      const subOptionsValues = subOptionsConfig.map(option => option.value);

      this.props.updateProspect({ [industrySubCatName]: subOptionsValues });
    }
  }

  renderOptionsForSubId = (value, valueConfig) => {
    if (value) {
      const optionsArr = valueConfig.datalist.filter(item => value.includes(item.value));

      const subOptionsArr = optionsArr
        .map(item => item.subCategory)
        .reduce((acc, curr) => [...acc, ...curr], []);
      return subOptionsArr;
    }
  };

  render() {
    const { industryValue, industryConfig } = this.props;
    const subOptions = this.renderOptionsForSubId(industryValue, industryConfig);

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
