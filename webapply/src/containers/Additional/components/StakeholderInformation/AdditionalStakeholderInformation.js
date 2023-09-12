import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import routes from "../../../../routes";
import { NEXT, formStepper } from "../../../../constants";
import { useLayoutParams } from "../../../FormLayout";
import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { useViewId } from "../../../../utils/useViewId";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import StakeholdersDetail from "../../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";

import { Background } from "./components/Background";
import { ResidentialAddress } from "./components/ResidentialAddress";
import { StakeholderTaxDeclarations } from "./components/StakeholderTaxDeclaration";
import { SourceOfIncome } from "./components/SourceOfIncome";

import { useStyles } from "../styled";
import { updateStakeholderInfoStatus } from "../../../../store/actions/additionalInfo";
import { getSignatories, isFieldTouched } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";
import { getIsComeback } from "../../../../store/selectors/retrieveApplicantInfo";
import { Footer } from "../../../../components/Footer";

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
  const isTouched = useSelector(isFieldTouched("stakeholderTaxDeclarationSection"));
  const { addionalStakeholderInfoStatus } = useSelector(state => state.additionalInfo);
  const isComeback = useSelector(getIsComeback);
  const { showSOF } = useSelector(getSignatories)[0];
  const signatoryInfo = useSelector(getSignatories);

  const backgroundFormRef = useRef(null);
  const backgroundAccordionRef = useRef(null);

  const sourceOfIncomeFormRef = useRef(null);
  const sourceOfIncomeAccordionRef = useRef(null);

  const residentialFormRef = useRef(null);
  const residentialAccordionRef = useRef(null);

  const stakeHolderFormRef = useRef(null);
  const stakeHolderTaxAccordionRef = useRef(null);

  useEffect(() => {
    !showSOF &&
      dispatch(
        updateProspect({
          "prospect.signatoryInfo[0].stakeholderAdditionalInfo.sourceOfIncomeDetails": {}
        })
      );
    !addionalStakeholderInfoStatus && dispatch(updateStakeholderInfoStatus("inProgress"));
  }, []);

  const initialValues = {
    backgroundInfoSection: "",
    sourceOfIncomeSection: "",
    residentialAddressSection: "",
    stakeholderTaxDeclarationSection: "",
    showSOF
  };

  const formValidationSchema = Yup.object().shape({
    backgroundInfoSection: Yup.boolean()
      .required()
      .oneOf([true]),
    sourceOfIncomeSection: Yup.mixed().when("showSOF", {
      is: showSOF => showSOF,
      then: Yup.boolean()
        .required()
        .oneOf([true])
    }),
    residentialAddressSection: Yup.boolean()
      .required()
      .oneOf([true]),
    stakeholderTaxDeclarationSection: Yup.boolean()
      .required()
      .oneOf([true])
  });

  const handleClickNextStep = () => {
    setIsLoading(true);
    const fullName = `${signatoryInfo[0].editedFullName}`;
    const editedName =
      fullName.length > 19 ? signatoryInfo[0].editedFullName.split(" ")[0] : fullName;
    const nameOnCard = editedName.length > 19 ? editedName.subString(0, 18) : editedName;
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].debitCardInfo.authSignatoryDetails.nameOnDebitCard": nameOnCard
      })
    );
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

  const handleFormAcordions = (formRef, accordionRef, isCompleted) => {
    let isAccordionOpen = accordionRef?.current?.getAttribute("aria-expanded") === "true";

    if (formRef) {
      formRef.submitForm();
    }

    if (!isCompleted && !isAccordionOpen && accordionRef?.current !== null) {
      accordionRef.current.click();
    }
  };

  const handleNextClickAction = validationResults => {
    try {
      let forms = {
        background: {
          formRef: backgroundFormRef.current,
          accordionRef: backgroundAccordionRef,
          isCompleted: validationResults?.backgroundInfoSection
        },
        sourceOfIncome: {
          formRef: sourceOfIncomeFormRef.current,
          accordionRef: sourceOfIncomeAccordionRef,
          isCompleted: validationResults?.sourceOfIncomeSection
        },
        residential: {
          formRef: residentialFormRef.current,
          accordionRef: residentialAccordionRef,
          isCompleted: validationResults?.residentialAddressSection
        },
        taxDeclaration: {
          formRef: stakeHolderFormRef.current,
          accordionRef: stakeHolderTaxAccordionRef,
          isCompleted: validationResults?.stakeholderTaxDeclarationSection
        }
      };

      Object.keys(forms).forEach(formName => {
        const { formRef, accordionRef, isCompleted } = forms[formName];
        handleFormAcordions(formRef, accordionRef, isCompleted);
      });
    } catch (validationError) {
      console.error(validationError);
    }
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
          const isValidStakeholderInfo =
            formValidationSchema.isValidSync(props.values) && (isTouched || isComeback);
          return (
            <Form>
              <div className={classes.additionalCompanyInfoContainer}>
                <div className={classes.companyInfoDetailWrapper}>
                  <div className={classes.companyNameinfoContainer}>
                    <StakeholdersDetail name={stakeholderName} companyCategory={companyCategory} />
                  </div>
                  <Background
                    id={"backgroundInfoSection"}
                    refs={{ backgroundFormRef, backgroundAccordionRef }}
                    {...props}
                  />
                  {showSOF && (
                    <SourceOfIncome
                      id={"sourceOfIncomeSection"}
                      refs={{ sourceOfIncomeFormRef, sourceOfIncomeAccordionRef }}
                      {...props}
                    />
                  )}
                  <ResidentialAddress
                    id={"residentialAddressSection"}
                    refs={{ residentialFormRef, residentialAccordionRef }}
                    {...props}
                  />
                  <StakeholderTaxDeclarations
                    id={"stakeholderTaxDeclarationSection"}
                    refs={{ stakeHolderFormRef, stakeHolderTaxAccordionRef }}
                    {...props}
                  />
                </div>
                <Footer>
                  <BackLink path={routes.additionalInfoComponent} isTypeButton={true} />
                  <NextStepButton
                    justify="flex-end"
                    label="Next"
                    isDisplayLoader={isLoading}
                    onClick={() => handleNextClickAction(props?.values)}
                  />
                </Footer>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
