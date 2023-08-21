/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";

import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../../FormLayout";
import { formStepper, NEXT } from "../../../../constants";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { ICONS, Icon } from "../../../../components/Icons";
import { ColoredAvatar } from "../../../../components/Avatar/ColoredAvatar";
import { BusinessRelationship } from "./components/Business";
import { FinancialTurnoverSection } from "./components/FinancialTurnoverSection";
import { MailingAddressSection } from "./components/MailingAddressSection";
import { TaxDeclarationsSection } from "./components/TaxDeclarationsSection";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { useViewId } from "../../../../utils/useViewId";

import { useStyles } from "../styled";
import { updateCompanyAdditionalInfoStatus } from "../../../../store/actions/additionalInfo";
import { isFieldTouched } from "../../../../store/selectors/appConfig";
import { getIsComeback } from "../../../../store/selectors/retrieveApplicantInfo";
import { Footer } from "../../../../components/Footer";

export const AddCompanyInformation = ({
  companyName,
  topCustomers,
  topSuppliers,
  sendProspectToAPI
}) => {
  const classes = useStyles();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const pushHistory = useTrackingHistory();
  const dispatch = useDispatch();

  const isTouched = useSelector(isFieldTouched("isTaxDeclarationCompleted"));
  const { companyAdditionalInfoStatus } = useSelector(state => state.additionalInfo);
  const isComeback = useSelector(getIsComeback);

  const [isLoading, setIsLoading] = useState(false);
  const businessFormRef = useRef(null);
  const bussinesAccordionRef = useRef(null);

  const mailAddressFormRef = useRef(null);
  const mailAddressAccordionRef = useRef(null);

  const financialFormRef = useRef(null);
  const financialAccordionRef = useRef(null);

  const taxDeclarationFormRef = useRef(null);
  const taxDeclarationAccordionRef = useRef(null);

  useEffect(() => {
    !companyAdditionalInfoStatus && dispatch(updateCompanyAdditionalInfoStatus("inProgress"));
  }, []);

  const initialValues = {
    isBusinessRelationshipCompleted: "",
    isFinancialTurnoverCompleted: "",
    isMailingAddressCompleted: "",
    isTaxDeclarationCompleted: ""
  };

  const formValidationSchema = Yup.object().shape({
    isBusinessRelationshipCompleted: Yup.boolean()
      .required()
      .oneOf([true]),
    isFinancialTurnoverCompleted: Yup.boolean()
      .required()
      .oneOf([true]),
    isMailingAddressCompleted: Yup.boolean()
      .required()
      .oneOf([true]),
    isTaxDeclarationCompleted: Yup.boolean()
      .required()
      .oneOf([true])
  });

  const handleClickNextStep = () => {
    setIsLoading(true);

    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) {
          dispatch(updateCompanyAdditionalInfoStatus("completed"));
          pushHistory(routes.additionalInfoComponent, true);
        }
      },
      () => setIsLoading(false)
    );
  };

  const handleFormAcordions = (formRef, accordionRef, isCompleted) => {
    let isAccordionOpen = accordionRef?.current.getAttribute("aria-expanded") === "true";

    if (formRef) {
      formRef.submitForm();
    }

    if (!isCompleted && !isAccordionOpen) {
      accordionRef.current.click();
    }
  };

  const handleNextClickAction = validationResults => {
    try {
      let forms = {
        business: {
          formRef: businessFormRef.current,
          accordionRef: bussinesAccordionRef,
          isCompleted: validationResults?.isBusinessRelationshipCompleted
        },
        mailAddress: {
          formRef: mailAddressFormRef.current,
          accordionRef: mailAddressAccordionRef,
          isCompleted: validationResults?.isMailingAddressCompleted
        },
        financial: {
          formRef: financialFormRef.current,
          accordionRef: financialAccordionRef,
          isCompleted: validationResults?.isFinancialTurnoverCompleted
        },
        taxDeclarations: {
          formRef: taxDeclarationFormRef.current,
          accordionRef: taxDeclarationAccordionRef,
          isCompleted: validationResults?.isTaxDeclarationCompleted
        }
      };

      Object.keys(forms).forEach(formName => {
        const { formRef, accordionRef, isCompleted } = forms[formName];
        handleFormAcordions(formRef, accordionRef, isCompleted);
      });
    } catch (validationError) {
      // console.error(validationError);
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
        {({ isValid, ...props }) => {
          const isValidForm =
            formValidationSchema.isValidSync(props.values) && (isTouched || isComeback);

          return (
            <Form>
              <div className={classes.additionalCompanyInfoContainer}>
                <div className={classes.companyInfoDetailWrapper}>
                  <div className={classes.companyNameinfoContainer}>
                    <ColoredAvatar fullName={companyName} color={"#FDE7E8"}>
                      {companyName?.charAt(0)?.toUpperCase()}
                    </ColoredAvatar>
                    {companyName}
                  </div>
                  <BusinessRelationship
                    topCustomers={topCustomers}
                    topSuppliers={topSuppliers}
                    id={"isBusinessRelationshipCompleted"}
                    refs={{ businessFormRef, bussinesAccordionRef }}
                    {...props}
                  />
                  <FinancialTurnoverSection
                    id={"isFinancialTurnoverCompleted"}
                    refs={{ financialFormRef, financialAccordionRef }}
                    {...props}
                  />
                  <MailingAddressSection
                    id={"isMailingAddressCompleted"}
                    refs={{ mailAddressFormRef, mailAddressAccordionRef }}
                    {...props}
                  />
                  <TaxDeclarationsSection
                    id={"isTaxDeclarationCompleted"}
                    {...props}
                    refs={{ taxDeclarationFormRef, taxDeclarationAccordionRef }}
                  />
                </div>
                <Footer>
                  <BackLink path={routes.additionalInfoComponent} isTypeButton={true} />
                  <NextStepButton
                    justify="flex-end"
                    label="Next"
                    isDisplayLoader={isLoading}
                    type="submit"
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
