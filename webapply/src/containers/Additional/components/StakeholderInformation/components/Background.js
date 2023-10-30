import React, { useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import cx from "classnames";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { isEmpty } from "lodash";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import {
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../../../constants";
import { Upload } from "../../../../../components/Upload";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";

import { useStyles } from "../../styled";
import {
  getDatalist,
  getDocuments,
  getProspect,
  getSignatories
} from "../../../../../store/selectors/appConfig";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { LINKEDIN_REGEX } from "../../../../../utils/validation";
import { uploadDocuments } from "../../../../../store/actions/uploadDocuments";
import { useFindDocument } from "../../../../../utils/useFindDocument";

export const Background = ({ id, refs }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employmentType } = useSelector(getDatalist);
  const { signatoryInfo } = useSelector(getProspect);

  const [showGenaralErr, setShowGeneralErr] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo.backgroundDetails";
  const signatoryName = useSelector(getSignatories)[0]?.fullName;

  const documents =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.personalBackground
      ?.documents ?? null;

  const documentKeyToCheck =
    "prospect.prospectDocuments.stakeholderAdditionalInfo.backgroundDetails.cv";

  const cv = useFindDocument(documents, documentKeyToCheck);
  const { backgroundFormRef, backgroundAccordionRef } = refs;

  const initialValues = {
    highestEducationAttained: "",
    employmentStatus: employmentType?.filter(item => item.code === "Self-employed")[0]?.value,
    linkedInURL: "",
    backgroundInfo: "",
    cv: cv[0] || "",
    common: ""
  };

  const backgroundSchema = Yup.object().shape({
    highestEducationAttained: Yup.string()
      .nullable()
      .required(getRequiredMessage("Highest education")),
    employmentStatus: Yup.string().required(getRequiredMessage("Employment type")),
    linkedInURL: Yup.string()
      .nullable()
      .min(27, "LinkedIn URL is too short. Please enter a valid LinkedIn profile URL.")
      .max(200, "LinkedIn URL is too long. Please enter upto 200 characters.")
      .matches(
        LINKEDIN_REGEX,
        "Invalid LinkedIn URL format. Please enter a valid LinkedIn profile URL."
      ),
    backgroundInfo: Yup.string()
      .nullable()
      .min(100, "Background information is too short. Please enter at least 100 characters.")
      .max(2000, "Background information is too long. Please enter upto 2000 characters."),
    cv: Yup.string(),
    common: Yup.string().when(["linkedInURL", "backgroundInfo", "cv"], {
      is: (linkedInURL, backgroundInfo, cv) => {
        return !(linkedInURL || backgroundInfo || cv);
      },
      then: Yup.string().required(
        "One of the three (CV, LinkedIn URL, Background information) is mandatory."
      )
    })
  });

  const handleDropFile = useCallback((acceptedFiles, name, touched, setTouched, setFieldValue) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading({ [name]: true });
      dispatch(
        uploadDocuments({
          docs: {
            "prospect.prospectDocuments.stakeholderAdditionalInfo.backgroundDetails.cv": file
          },
          documentSection:
            "stakeholdersDocuments.index_stakeholderName.personalBackground.documents",
          onSuccess: () => {
            let fileStore = new File([file], file.name, { type: file.type });
            fileStore.preview = URL.createObjectURL(fileStore);
            fileStore = { ...fileStore, ...{ fileName: fileStore.name, fileSize: fileStore.size } };
            setFieldValue(name, fileStore);
            setTouched({ ...touched, ...{ [name]: true } });
            setIsUploading({ [name]: false });
          },
          onFailure: () => {
            setFieldValue(name, "");
            setIsUploading({ [name]: false });
          },
          saveProspectPath: `stakeholdersDocuments.0_${[
            signatoryName
          ]}.personalBackground.documents`
        })
      );
    }
  }, []);

  const handleBlur = (value, err) => {
    value && err.common ? setShowGeneralErr(true) : setShowGeneralErr(false);
  };

  const initialIsValid = backgroundSchema.isValidSync(initialValues);

  useEffect(() => {
    signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.highestEducationAttained &&
      !initialIsValid &&
      setShowGeneralErr(true);
  }, [signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.highestEducationAttained]);

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={() => {}}
      validationSchema={backgroundSchema}
      isInitialValid={initialIsValid}
      innerRef={backgroundFormRef}
    >
      {({ touched, setTouched, setFieldValue, values, isValid, errors }) => {
        const isBackgroundDetailsEmpty =
          values?.backgroundInfo?.length === 0 &&
          values?.linkedInURL?.length === 0 &&
          isEmpty(values?.cv);

        return (
          <Accordion
            title={"Professional background"}
            isCompleted={isValid}
            id={id}
            classes={{
              accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
              accordionSummaryContentExpanded: classes.additionalInfoAccordionSummaryContentExpanded
            }}
            accordionRef={backgroundAccordionRef}
          >
            <>
              <div className={classes.descriptionSubField}>
                <p>
                  To help us understand your professional experience, please provide employment and
                  qualification details relevant to your current position.
                </p>
              </div>

              <p className={classes.sectionLabel}>Education and employment</p>
              <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="highestEducationAttained"
                    path={`${basePath}.highestEducationAttained`}
                    datalistId="qualification"
                    label={"Highest education"}
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="0"
                    onBlur={e => handleBlur(e.target.value, errors)}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="employmentStatus"
                    path={`${basePath}.employmentStatus`}
                    datalistId="employmentType"
                    label={"Employment type"}
                    isSearchable
                    component={SelectAutocomplete}
                    tabIndex="0"
                    disabled={true}
                  />
                </Grid>
              </Grid>
              {/* <div className={classes.taxDeclarationQuestionare}>
                <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                  Does this person work at Neha Kiran Agarwal Men W C R G Trading?
                  <span>We're required to ask this for regulatory reasons.</span>
                </label>
                <Field
                  typeRadio
                  options={YesNoList}
                  name="isWorkingOnSameCompany"
                  component={InlineRadioGroup}
                  customIcon={false}
                  classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                  radioColor="primary"
                />
              </div> */}
              <div className={classes.taxDeclarationQuestionare}>
                <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                  Background details
                  <span>Please provide ONE of the below.</span>
                </label>
                {errors.common && (showGenaralErr || isBackgroundDetailsEmpty) && (
                  <div className={classes.uploadModalErrorWrapper}>
                    <ErrorOutlineIcon className={classes.errorIcon} />
                    {errors.common}
                  </div>
                )}
                <Field
                  name="cv"
                  type="file"
                  path="prospect.prospectDocuments.additionalStakeholderDocument.cv"
                  fieldDescription="CV"
                  helperText={SUPPORTED_FILE_FORMAT_TEXT}
                  accept={TL_ACCEPTED_FILE_TYPES}
                  fileSize={TL_COI_FILE_SIZE}
                  onDrop={acceptedFile =>
                    handleDropFile(acceptedFile, "cv", touched, setTouched, setFieldValue)
                  }
                  file={values.cv}
                  content={values?.cv}
                  onDelete={() => setFieldValue("cv", "")}
                  component={Upload}
                  isUploading={isUploading["cv"]}
                  mobilecontentPlaceholder={"Upload your file"}
                />
              </div>
              <span className={classes.orSelection}>Or</span>
              <Field
                name="linkedInURL"
                path={`${basePath}.linkedInURL`}
                label="LinkedIn URL"
                placeholder="LinkedIn URL"
                InputProps={{
                  inputProps: { tabIndex: 1, maxLength: 200, showInLineError: true }
                }}
                component={Input}
                classes={{ formControlRoot: classes.customUrlLabel }}
              />
              <span className={classes.orSelection}>Or</span>
              <Field
                name="backgroundInfo"
                path={`${basePath}.backgroundInfo`}
                label="Background information"
                placeholder="Share details about your professional experience..."
                multiline
                rows="9"
                InputProps={{
                  inputProps: { tabIndex: 0, maxLength: 2000, minLength: 100 }
                }}
                component={Input}
                fieldDescription={
                  "Provide a summary of your employment and qualifications as relevant to your current position."
                }
                classes={{ formControlRoot: classes.customUrlLabel, input: classes.textAreaStyle }}
              />
            </>
          </Accordion>
        );
      }}
    </Formik>
  );
};
