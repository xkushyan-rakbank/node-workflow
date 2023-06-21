import React from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";
import cx from "classnames";

import {
  AutoSaveField as Field,
  InlineRadioGroup,
  Input,
  SelectAutocomplete
} from "../../../../../components/Form";
import { YesNoList } from "../../../../../constants/options";
import { TL_ACCEPTED_FILE_TYPES, TL_COI_FILE_SIZE } from "../../../../../constants";
import { Upload } from "../../../../../components/Upload";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";

import { useStyles } from "../../styled";

export const Background = () => {
  const classes = useStyles();

  const basePath = "prospect.stakeholderAdditionalInfo.backgroundDetails";

  const initialValues = {
    highestEducationAttained: "",
    employmentStatus: "",
    editedMothersMaidenName: "",
    linkedInURL: "",
    backgroundInfo: ""
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}} validateOnChange={false}>
      {props => {
        return (
          <Accordion title={"Background"} id={"background"} isCompleted={true}>
            <>
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
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="editedMothersMaidenName"
                    path={`${basePath}.editedMothersMaidenName`}
                    label="Mother’s maiden name"
                    placeholder="Mother’s maiden name"
                    InputProps={{
                      inputProps: { tabIndex: 1 }
                    }}
                    component={Input}
                  />
                </Grid>
              </Grid>
              <div className={classes.taxDeclarationQuestionare}>
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
              </div>
              <div className={classes.taxDeclarationQuestionare}>
                <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                  Background details
                  <span>Please provide ONE of the below.</span>
                </label>
                <Field
                  name="cv"
                  type="file"
                  fieldDescription="CV"
                  helperText={"Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"}
                  accept={TL_ACCEPTED_FILE_TYPES}
                  fileSize={TL_COI_FILE_SIZE}
                  component={Upload}
                />
              </div>
              <span className={classes.orSelection}>Or</span>
              <Field
                name="linkedInURL"
                path={`${basePath}.linkedInURL`}
                label="LinkedIn URL"
                placeholder="LinkedIn URL"
                InputProps={{
                  inputProps: { tabIndex: 1 }
                }}
                component={Input}
                classes={{ formControlRoot: classes.customUrlLabel }}
              />
              <span className={classes.orSelection}>Or</span>
              <Field
                name="backgroundInfo"
                path={`${basePath}.backgroundInfo`}
                label="Background information"
                placeholder="Background information"
                multiline
                minRows="9"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                component={Input}
                fieldDescription={
                  "Provide a summary of your employment and qualifications as relevant to your current position."
                }
                classes={{ formControlRoot: classes.customUrlLabel }}
              />
            </>
          </Accordion>
        );
      }}
    </Formik>
  );
};
