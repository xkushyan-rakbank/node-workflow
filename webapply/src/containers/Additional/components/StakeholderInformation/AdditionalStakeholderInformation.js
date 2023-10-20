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
import { getAccordionStatuses } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";
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
  const accordionStatuses = useSelector(getAccordionStatuses);
  const statuses = JSON.parse(accordionStatuses);
  const { addionalStakeholderInfoStatus } = useSelector(state => state.additionalInfo);

  const backgroundFormRef = useRef(null);
  const backgroundAccordionRef = useRef(null);

  const sourceOfIncomeFormRef = useRef(null);
  const sourceOfIncomeAccordionRef = useRef(null);

  const residentialFormRef = useRef(null);
  const residentialAccordionRef = useRef(null);

  const stakeHolderFormRef = useRef(null);
  const stakeHolderTaxAccordionRef = useRef(null);

  const additionalStakeHolderForm = useRef(null);
  let inCompleteAccordionList = [];

  useEffect(() => {
    if (!addionalStakeholderInfoStatus) {
      statuses["addionalStakeholderInfoStatus"] = "In Progress";
      dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
    }
  }, []);

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
          statuses["addionalStakeholderInfoStatus"] = "completed";
          dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
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
    inCompleteAccordionList.length > 0 &&
      inCompleteAccordionList[0].parentNode.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleNextClickAction = ({ value: validationResults, ...props }) => {
    try {
      props.submitForm();
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
        if (!isCompleted && inCompleteAccordionList.indexOf(accordionRef.current) === -1) {
          inCompleteAccordionList.push(accordionRef.current);
        }
      });
    } catch (validationError) {
      console.error(validationError);
    }
  };

  useEffect(() => {
    if (additionalStakeHolderForm.current) {
      const isValidForm = formValidationSchema.isValidSync(
        additionalStakeHolderForm.current.values
      );
      if (!isValidForm) {
        statuses["addionalStakeholderInfoStatus"] = "In Progress";
        dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
      }
    }
  }, [additionalStakeHolderForm]);

  useEffect(() => {
    additionalStakeHolderForm.current.setFieldValue(
      "backgroundInfoSection",
      statuses["backgroundInfoSection"]
    );
    additionalStakeHolderForm.current.setFieldValue(
      "sourceOfIncomeSection",
      statuses["sourceOfIncomeSection"]
    );
    additionalStakeHolderForm.current.setFieldValue(
      "residentialAddressSection",
      statuses["residentialAddressSection"]
    );
    additionalStakeHolderForm.current.setFieldValue(
      "stakeholderTaxDeclarationSection",
      statuses["stakeholderTaxDeclarationSection"]
    );
  }, [statuses]);

  return (
    <>
      <Formik
        innerRef={additionalStakeHolderForm}
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={handleClickNextStep}
        validateOnChange={true}
        validateOnMount={true}
      >
        {props => {
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
                  <SourceOfIncome
                    id={"sourceOfIncomeSection"}
                    refs={{ sourceOfIncomeFormRef, sourceOfIncomeAccordionRef }}
                    {...props}
                  />
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
                    type="button"
                    isDisplayLoader={isLoading}
                    onClick={() => handleNextClickAction(props)}
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
