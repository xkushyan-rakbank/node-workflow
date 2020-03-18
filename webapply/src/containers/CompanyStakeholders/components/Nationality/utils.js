import uniqueId from "lodash/uniqueId";
import { getIn } from "formik";

const initialPassportDetails = {
  country: "",
  hasAnotherCitizenship: false,
  passportNumber: "",
  diplomatPassport: false
};

export const createAddCitizenshipHandler = (values, arrayHelper, passportIndex) => () => {
  const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
  const value = values.passportDetails[passportIndex].hasAnotherCitizenship;

  if (!value) {
    arrayHelper.push({ ...initialPassportDetails, id: uniqueId() });
  } else {
    values.passportDetails.forEach((_, index) => {
      if (index > passportIndex) {
        arrayHelper.form.setFieldTouched(`passportDetails[${index}]`, false);
        arrayHelper.pop();
      }
    });
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
