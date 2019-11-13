import React, { useMemo } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Select from "../../InputField/PureSelect";
import Input from "../../InputField/TextInput";
import Checkbox from "../../InputField/RefactoredCheckbox";
import { getInputValueById } from "../../../store/selectors/input";
import { updateProspect } from "../../../store/actions/appConfig";
import { handleCitizenship } from "../../../store/actions/stakeholders";
import { useStyles } from "./styled";

const MAX_ANOTHER_CITIZENSHIP = 4;

const Nationality = ({ index, passportDetails, handleCitizenship }) => {
  const classes = useStyles();
  const memoizedPassportDetails = useMemo(() => {
    return passportDetails.map((item, passportIndex) => {
      const citizenshipHandler = value => handleCitizenship(index, value, passportIndex);
      const calcDisabling = () =>
        get(passportDetails[0], "hasAnotherCitizenship")
          ? !get(passportDetails[passportIndex - 1], "hasAnotherCitizenship")
          : true;
      const disabled = passportIndex === 0 ? false : calcDisabling();

      return (
        <React.Fragment key={passportIndex}>
          <Grid item sm={12} className={classes.divider} />
          <Grid item md={6} sm={12}>
            <Select id="SigKycd.nationality" indexes={[index, passportIndex]} disabled={disabled} />
            {passportIndex < MAX_ANOTHER_CITIZENSHIP && (
              <Checkbox
                id="SigKycd.hasAnotherCitizenship"
                indexes={[index, passportIndex]}
                callback={citizenshipHandler}
              />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <Input
              id="SigKycdPspd.passportNumber"
              indexes={[index, passportIndex]}
              disabled={disabled}
            />
            <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[index, passportIndex]} />
          </Grid>
        </React.Fragment>
      );
    });
  }, [classes.divider, handleCitizenship, index, passportDetails]);

  return (
    <>
      <Grid container spacing={3}>
        {memoizedPassportDetails}
      </Grid>
    </>
  );
};

const mapStateToProps = (state, { index }) => {
  return {
    isDualCitizenship: getInputValueById(state, "SigKycd.hasAnotherCitizenship", [index, 0]),
    passportDetails: get(
      state,
      `appConfig.prospect.signatoryInfo[${index}].kycDetails.passportDetails`,
      []
    )
  };
};

const mapDispatchToProps = {
  updateProspect,
  handleCitizenship
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nationality);
