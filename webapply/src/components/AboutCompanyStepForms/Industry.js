import React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById, getFieldConfigById } from "../../store/selectors/input";
import InfoTitle from "../InfoTitle";

class Industry extends React.Component {
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
  industryConfig: getFieldConfigById(state, "OkycIndus.industry")
});

export default connect(mapStateToProps)(Industry);
