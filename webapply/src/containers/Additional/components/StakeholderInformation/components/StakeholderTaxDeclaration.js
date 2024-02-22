/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldArray, Formik } from "formik";
import { Button, Grid, IconButton } from "@material-ui/core";
import * as Yup from "yup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  YesNoListForTaxPayInAnotherCountry,
  enumYesNoOptions
} from "../../../../../constants/options";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  Input,
  SelectAutocomplete
} from "../../../../../components/Form";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import TermsAndConditionsDialog from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/TermsAndConditionsDialog";

import { useStyles } from "../../styled";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { updateProspect } from "../../../../../store/actions/appConfig";
import { getIsIslamicBanking, getSignatories } from "../../../../../store/selectors/appConfig";
import { ALLOWED_CHAR_REGEX, ALPHANUMERIC_ONLY_REGEX } from "../../../../../utils/validation";

const defaulatTaxDetails = {
  country: "",
  TIN: "",
  reasonForTINNotAvailable: "",
  remarks: "",
  isTINAvailable: ""
};

export const StakeholderTaxDeclarations = ({ id, refs }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);

  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo";
  const signatories = useSelector(getSignatories);
  const isIslamic = useSelector(getIsIslamicBanking);
  const taxDetails = useMemo(() => {
    if (!signatories[0]?.stakeholderAdditionalInfo?.taxDetails) {
      return null;
    }
    const details = [...signatories[0]?.stakeholderAdditionalInfo?.taxDetails];
    if (details[0] !== "") {
      const index = details.findIndex(element => element && element.country === "AE");
      if (index > 0) {
        details.splice(index, 1);
      }
    }
    return details.length === 0 ? null : details;
  }, [signatories]);

  const initialValues = {
    taxDetails: taxDetails || [defaulatTaxDetails],
    taxesInAnotherCountry: ""
  };

  const createStakeholderTaxRadioHandler = ({ values, setFieldValue, index }, event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFieldValue(name, value);
    if (name === "taxesInAnotherCountry") {
      if (value === "no") {
        setFieldValue("taxDetails", []);
        dispatch(
          updateProspect({
            [`${basePath}.taxDetails`]: []
          })
        );
      } else {
        setFieldValue("taxDetails", [defaulatTaxDetails]);
      }
    }
    if (name === `taxDetails[${index}].isTINAvailable`) {
      if (value === "yes") {
        setFieldValue(`taxDetails[${index}].reasonForTINNotAvailable`, "");
        setFieldValue(`taxDetails[${index}].remarks`, "");
        dispatch(
          updateProspect({
            [`${basePath}.taxDetails[${index}].reasonForTINNotAvailable`]: "",
            [`${basePath}.taxDetails[${index}].remarks`]: ""
          })
        );
      }
      if (value === "no") {
        setFieldValue(`taxDetails[${index}].TIN`, "");
        dispatch(
          updateProspect({
            [`${basePath}.taxDetails[${index}].TIN`]: ""
          })
        );
      }
    }
  };

  const stakeholderTaxInfoSchema = Yup.object().shape({
    taxesInAnotherCountry: Yup.string()
      .nullable()
      .required("Do you pay taxes in another country is required")
      .oneOf(["yes", "no"], "Do you pay taxes in another country is required"),
    taxDetails: Yup.array().when("taxesInAnotherCountry", {
      is: "yes",
      then: Yup.array()
        .of(
          Yup.object().shape({
            country: Yup.string()
              .required(getRequiredMessage("Country"))
              .typeError(getRequiredMessage("Country")),
            isTINAvailable: Yup.string().required(
              getRequiredMessage("Taxpayer Identification number")
            ),
            TIN: Yup.string().when("isTINAvailable", {
              is: "yes",
              then: Yup.string()
                .required(getRequiredMessage("Taxpayer Identification number"))
                .max(40, "Maximum ${max} characters allowed")
                .matches(
                  ALPHANUMERIC_ONLY_REGEX,
                  "Please enter a valid Taxpayer Identification number without special characters"
                ),
              otherwise: Yup.string().nullable()
            }),
            reasonForTINNotAvailable: Yup.string().when("isTINAvailable", {
              is: "no",
              then: Yup.string().required(
                getRequiredMessage("Select a reason if TIN is not available")
              ),
              otherwise: Yup.string().nullable()
            }),
            remarks: Yup.string().when("reasonForTINNotAvailable", {
              is: reasonForTINNotAvailable => reasonForTINNotAvailable === "B-UNABLE GET TIN",
              then: Yup.string()
                .required(getRequiredMessage("Remarks"))
                .max(500, "Maximum ${max} characters allowed"),
              otherwise: Yup.string().nullable()
            })
          })
        )
        .required("At least one tax detail is required"),
      otherwise: Yup.array().notRequired()
    })
  });

  const { stakeHolderFormRef, stakeHolderTaxAccordionRef } = refs;

  const definitionContext = (
    <a
      className={classes.definitionLink}
      onClick={e => {
        e.stopPropagation();
        setOpenDefinitionDialog(true);
      }}
    >
      Definition
    </a>
  );

  const removeTaxDetails = (index, setFieldValue, values) => {
    let taxDetails = [...values.taxDetails];
    taxDetails.splice(index, 1);
    setFieldValue("taxDetails", taxDetails);
    dispatch(
      updateProspect({
        [`${basePath}.taxDetails`]: taxDetails
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={stakeholderTaxInfoSchema}
      validateOnChange={false}
      onSubmit={() => {}}
      innerRef={stakeHolderFormRef}
    >
      {({ values, setFieldValue, isValid, errors }) => {
        const IsValidForm = stakeholderTaxInfoSchema.isValidSync(values);
        const hideAnotherCountryTaxField = values.taxesInAnotherCountry === "yes";
        return (
          <>
            <Accordion
              title={"Tax declarations"}
              showDefinition={definitionContext}
              id={id}
              isCompleted={IsValidForm}
              classes={{
                accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
                accordionSummaryContentExpanded:
                  classes.additionalInfoAccordionSummaryContentExpanded
              }}
              accordionRef={stakeHolderTaxAccordionRef}
            >
              <div>
                <div className={classes.descriptionSubField}>
                  <p>
                    For regulatory compliance, we need to know if you pay taxes in any country other
                    than the UAE. If you have a Tax Identification Number (TIN), enter it in the
                    field provided below.
                  </p>
                </div>
                <DisclaimerNote
                  className={classes.noteWrapper}
                  text={`${
                    !isIslamic ? "RAKBANK" : "RAKislamic"
                  } cannot offer advice on your tax status or classification. False/incorrect information submitted may lead to enforcement/penal action by the relevant authorities. If any information/tax status provided on this form changes, you must inform ${
                    !isIslamic ? "RAKBANK" : "RAKislamic"
                  } within 30 days of such a change and provide a suitably updated Self-Certification Form within 90 days of such change in circumstances. You may contact a professional tax advisor for further support`}
                />
                <div className={classes.taxDeclarationQuestionare}>
                  <label className={classes.sectionLabel}>
                    Do you pay taxes in another country?
                  </label>
                  <Field
                    typeRadio
                    name="taxesInAnotherCountry"
                    path={`${basePath}.taxesInAnotherCountry`}
                    options={YesNoListForTaxPayInAnotherCountry}
                    component={CheckboxGroup}
                    onSelect={event =>
                      createStakeholderTaxRadioHandler(
                        {
                          values,
                          setFieldValue
                        },
                        event
                      )
                    }
                    customIcon={false}
                    classes={{
                      root: classes.radioButtonRoot,
                      label: classes.radioLabelRoot
                    }}
                    isInlineStyle={false}
                    radioColor="primary"
                  />
                </div>
                {hideAnotherCountryTaxField && (
                  <FieldArray name="taxDetails">
                    {({ push, remove, arrayHelpers }) => {
                      return (
                        <>
                          {values.taxDetails.map((val, index) => {
                            const showRemarks =
                              hideAnotherCountryTaxField &&
                              values.taxDetails[index]?.reasonForTINNotAvailable ===
                                "B-UNABLE GET TIN";
                            return (
                              <Grid key={index} container spacing={3}>
                                {index > 0 && (
                                  <Grid
                                    className={classes.horizontalLine}
                                    item
                                    sm={12}
                                    xs={12}
                                  ></Grid>
                                )}
                                <Grid item sm={12} xs={12}>
                                  <Field
                                    name={`taxDetails[${index}].country`}
                                    path={`${basePath}.taxDetails[${index}].country`}
                                    label="Country"
                                    placeholder="Country"
                                    datalistId="country"
                                    component={SelectAutocomplete}
                                    filterOptions={options => {
                                      return options.filter(
                                        item =>
                                          item.code !== "AE" &&
                                          values.taxDetails?.[index - 1]?.country !== item.code
                                      );
                                    }}
                                  />
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                  <>
                                    <label className={classes.sectionLabel}>
                                      Do you have Taxpayer Identification number (TIN)?
                                    </label>
                                    <Field
                                      typeRadio
                                      name={`taxDetails[${index}].isTINAvailable`}
                                      path={`${basePath}.taxDetails[${index}].isTINAvailable`}
                                      options={enumYesNoOptions}
                                      component={CheckboxGroup}
                                      onSelect={event =>
                                        createStakeholderTaxRadioHandler(
                                          {
                                            values,
                                            setFieldValue,
                                            index
                                          },
                                          event
                                        )
                                      }
                                      customIcon={false}
                                      classes={{
                                        root: classes.radioButtonRoot,
                                        label: classes.radioLabelRoot
                                      }}
                                      isInlineStyle={true}
                                      radioColor="primary"
                                    />
                                  </>
                                </Grid>
                                {values.taxDetails[index]?.isTINAvailable === "yes" && (
                                  <Grid item sm={12} xs={12}>
                                    <Field
                                      name={`taxDetails[${index}].TIN`}
                                      path={`${basePath}.taxDetails[${index}].TIN`}
                                      label="Tax Identification Number (TIN)"
                                      placeholder="Tax Identification Number (TIN)"
                                      InputProps={{
                                        inputProps: {
                                          tabIndex: 1,
                                          maxLength: 40,
                                          showInLineError: true
                                        }
                                      }}
                                      component={Input}
                                      allowedCharRegex={ALLOWED_CHAR_REGEX}
                                    />
                                  </Grid>
                                )}
                                {values.taxDetails[index]?.isTINAvailable === "no" && (
                                  <>
                                    <Grid item sm={12} xs={12}>
                                      <Field
                                        name={`taxDetails[${index}].reasonForTINNotAvailable`}
                                        path={`${basePath}.taxDetails[${index}].reasonForTINNotAvailable`}
                                        label="Select a reason if TIN is not available"
                                        placeholder="Select a reason if TIN is not available"
                                        datalistId="TINReason"
                                        component={SelectAutocomplete}
                                        infoTitle={"We need to know this for regulatory reasons."}
                                        infoIcon={true}
                                      />
                                    </Grid>
                                    {showRemarks && (
                                      <Grid item sm={12} xs={12}>
                                        <Field
                                          name={`taxDetails[${index}].remarks`}
                                          path={`${basePath}.taxDetails[${index}].remarks`}
                                          label="Remarks"
                                          placeholder="Please explain why you are unable to obtain a TIN"
                                          multiline
                                          minRows="9"
                                          InputProps={{
                                            inputProps: { tabIndex: 0, maxLength: 500 }
                                          }}
                                          component={Input}
                                          classes={{ input: classes.textAreaStyle }}
                                          allowedCharRegex={ALLOWED_CHAR_REGEX}
                                        />
                                      </Grid>
                                    )}
                                  </>
                                )}
                                {index > 0 && (
                                  <IconButton
                                    aria-label="delete"
                                    style={{
                                      padding: 0,
                                      marginTop: "5px",
                                      marginBottom: "20px",
                                      width: "100%",
                                      justifyContent: "end"
                                    }}
                                    onClick={() => removeTaxDetails(index, setFieldValue, values)}
                                  >
                                    <HighlightOffIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            );
                          })}

                          {values.taxDetails.length < 2 && (
                            <Button
                              color="primary"
                              variant="outlined"
                              className={classes.addMoreButton}
                              onClick={() => push(defaulatTaxDetails)}
                              disabled={!values.taxDetails[0]?.country}
                            >
                              + Add more
                            </Button>
                          )}
                        </>
                      );
                    }}
                  </FieldArray>
                )}
              </div>
            </Accordion>
            <TermsAndConditionsDialog
              open={openDefinitionDialog}
              handleClose={() => setOpenDefinitionDialog(false)}
              editedFile={`${process.env.REACT_APP_PUBLIC_URL ||
                ""}/TaxDeclarations_Definition.pdf`}
              pages={[1]}
              scrollToEnd={false}
            />
          </>
        );
      }}
    </Formik>
  );
};
