import uniqueId from "lodash/uniqueId";
import { getIn } from "formik";

const initialPassportDetails = {
  country: "",
  hasAnotherCitizenship: false,
  passportNumber: "",
  diplomatPassport: false
};

export const createAddCitizenshipHandler = (
  values,
  arrayHelper,
  passportIndex,
  setFieldValue
) => () => {
  const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
  const value = values.passportDetails[passportIndex].hasAnotherCitizenship;

  if (!value) {
    arrayHelper.push({ ...initialPassportDetails, id: uniqueId() });
  } else {
    values.passportDetails.forEach((el, index) => index >= passportIndex && arrayHelper.pop());
  }
  setFieldValue(name, !value);
};

export const isAdditionalCitizenshipDisabled = (values, passportIndex, errors) => {
  return (
    !(
      getIn(values, `passportDetails[${passportIndex}].country`, false) &&
      getIn(values, `passportDetails[${passportIndex}].passportNumber`, false)
    ) || !!getIn(errors, `passportDetails[${passportIndex}].passportNumber`, false)
  );
};
