import uniqueId from "lodash/uniqueId";
import { getIn } from "formik";

const initialPassportDetails = {
  country: "",
  hasAnotherCitizenship: false,
  passportNumber: "",
  diplomatPassport: false
};

export const createAddCitizenshipHandler = (arrayHelper, passportIndex) => () => {
  const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
  const value = arrayHelper.form.values.passportDetails[passportIndex].hasAnotherCitizenship;

  if (!value) {
    arrayHelper.push({ ...initialPassportDetails, id: uniqueId() });
  } else {
    arrayHelper.form.setTouched({
      passportDetails: arrayHelper.form.values.passportDetails.slice(0, passportIndex + 1)
    });
    arrayHelper.form.values.passportDetails.forEach(
      (_, index) => index > passportIndex && arrayHelper.pop()
    );
  }
  arrayHelper.form.setFieldValue(name, !value);
};

export const isAdditionalCitizenshipDisabled = (values, passportIndex, errors) => {
  return (
    !(
      getIn(values, `passportDetails[${passportIndex}].country`, false) &&
      getIn(values, `passportDetails[${passportIndex}].passportNumber`, false)
    ) || !!getIn(errors, `passportDetails[${passportIndex}].passportNumber`, false)
  );
};
