import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import { getIndustryMultiSelect } from "../../store/selectors/appConfig";
import InfoTitle from "../InfoTitle";

class Industry extends React.Component {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect id="OkycIndus.industry" multiple indexes={[0, 0]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect disabled={true} id="OkycIndus.subCategory" indexes={[0, 0]} />
        </Grid>

        <InfoTitle title="These should be the same as in your Trade License. You can select multiple industries." />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  industryMultiSelect: getIndustryMultiSelect(state)
});

export default connect(mapStateToProps)(Industry);
