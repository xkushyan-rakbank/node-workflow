import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";

import routes from "../../../../routes";
import { NEXT, formStepper } from "../../../../constants";
import { useLayoutParams } from "../../../FormLayout";
import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { useViewId } from "../../../../utils/useViewId";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { ICONS, Icon } from "../../../../components/Icons";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import StakeholdersDetail from "../../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";

import { Background } from "./components/Background";
import { ResidentialAddress } from "./components/ResidentialAddress";
import { StakeholderTaxDeclarations } from "./components/StakeholderTaxDeclaration";
import { SourceOfIncome } from "./components/SourceOfIncome";

import { useStyles } from "../styled";
import { updateStakeholderInfoStatus } from "../../../../store/actions/additionalInfo";

export const AdditionalStakeholderInformation = ({
  stakeholderName,
  companyCategory,
  sendProspectToAPI
}) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);

  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    backgroundInfoSection: "",
    sourceOfIncomeSection: "",
    residentialAddressSection: "",
    stakeholderTaxDeclarationSection: ""
  };

  const formValidationSchema = Yup.object().shape({
    backgroundInfoSection: Yup.boolean()
      .required()
      .oneOf([true]),
    sourceOfIncomeSection: Yup.boolean()
      .required()
      .oneOf([true]),
    residentialAddressSection: Yup.boolean()
      .required()
      .oneOf([true]),
    stakeholderTaxDeclarationSection: Yup.boolean()
      .required()
      .oneOf([true])
  });

  const handleClickNextStep = () => {
    setIsLoading(true);

    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) {
          dispatch(updateStakeholderInfoStatus("completed"));
          pushHistory(routes.additionalInfoComponent, true);
        }
      },
      () => setIsLoading(false)
    );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={handleClickNextStep}
        validateOnChange={true}
        validateOnMount={true}
      >
        {props => {
          const isValidStakeholderInfo = formValidationSchema.isValidSync(props.values);
          return (
            <Form>
              <div className={classes.additionalCompanyInfoContainer}>
                <div>
                  <BackLink
                    path={routes.additionalInfoComponent}
                    onClick={() =>
                      dispatch(
                        updateStakeholderInfoStatus(
                          isValidStakeholderInfo ? "completed" : "inProgress"
                        )
                      )
                    }
                  />
                  <div className={classes.infoContainer}>
                    <Icon className={classes.infoIcon} alt="collapse-icon" name={ICONS.info} />
                    We need the information below to understand your business needs.
                  </div>
                  <div className={classes.companyInfoDetailWrapper}>
                    <div className={classes.companyNameinfoContainer}>
                      <StakeholdersDetail
                        name={stakeholderName}
                        companyCategory={companyCategory}
                      />
                    </div>
                    <Background id={"backgroundInfoSection"} {...props} />
                    <SourceOfIncome id={"sourceOfIncomeSection"} {...props} />
                    <ResidentialAddress id={"residentialAddressSection"} {...props} />
                    <StakeholderTaxDeclarations
                      id={"stakeholderTaxDeclarationSection"}
                      {...props}
                    />
                  </div>
                </div>
                <div className="linkContainer">
                  <NextStepButton
                    justify="flex-end"
                    label="Continue"
                    disabled={!isValidStakeholderInfo}
                    isDisplayLoader={isLoading}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
