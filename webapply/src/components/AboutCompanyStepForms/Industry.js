import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import { getOrgKYCDetails } from "../../store/selectors/appConfig";
import InfoTitle from "../InfoTitle";

class Industry extends React.Component {
  getIndustryMultiSelect() {
    return this.props.orgKYCDetails.industryMultiSelect || [];
  }

  getIndustryValueByIndex(index) {
    const { industry } = this.getIndustryMultiSelect()[index] || {
      industry: [""]
    };
    const [industryItem] = industry;
    return industryItem;
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          {Array.from(Array(this.getIndustryMultiSelect().length).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <PureSelect id="OkycIndus.industry" indexes={[index, 0]} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    disabled={!this.getIndustryValueByIndex(index)}
                    id="OkycIndus.subCategory"
                    indexes={[index, 0]}
                  />
                </Grid>
              </React.Fragment>
            );
          })}
          <InfoTitle title="These should be the same as in your Trade License. You can select multiple industries." />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  orgKYCDetails: getOrgKYCDetails(state)
});

export default connect(mapStateToProps)(Industry);
