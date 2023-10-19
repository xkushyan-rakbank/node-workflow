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
import { getAccordionStatuses, isFieldTouched } from "../../../../store/selectors/appConfig";
import { getIsComeback } from "../../../../store/selectors/retrieveApplicantInfo";
import { Footer } from "../../../../components/Footer";
import { updateProspect } from "../../../../store/actions/appConfig";
import { initDocumentUpload } from "../../../../store/actions/uploadDocuments";

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
  const accordionStatuses = useSelector(getAccordionStatuses);
  const statuses = JSON.parse(accordionStatuses);

  const { companyAdditionalInfoStatus } = statuses;

  const [isLoading, setIsLoading] = useState(false);
  const businessFormRef = useRef(null);
  const bussinesAccordionRef = useRef(null);

  const mailAddressFormRef = useRef(null);
  const mailAddressAccordionRef = useRef(null);

  const financialFormRef = useRef(null);
  const financialAccordionRef = useRef(null);

  const taxDeclarationFormRef = useRef(null);
  const taxDeclarationAccordionRef = useRef(null);

  const additionalCompamnyForm = useRef(null);
  let inCompleteAccordionList = [];

  useEffect(() => {
    if (!companyAdditionalInfoStatus) {
      statuses["companyAdditionalInfoStatus"] = "In Progress";
      dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
    }
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
          // dispatch(updateCompanyAdditionalInfoStatus("completed"));
          statuses["companyAdditionalInfoStatus"] = "completed";
          dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
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
    inCompleteAccordionList.length > 0 &&
      inCompleteAccordionList[0].parentNode.scrollIntoView({ behavior: "smooth", block: "center" });
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
        if (!isCompleted && inCompleteAccordionList.indexOf(accordionRef.current) === -1) {
          inCompleteAccordionList.push(accordionRef.current);
        }
      });
    } catch (validationError) {
      // console.error(validationError);
    }
  };

  useEffect(() => {
    if (additionalCompamnyForm.current) {
      const isValidForm = formValidationSchema.isValidSync(additionalCompamnyForm.current.values);
      if (!isValidForm) {
        statuses["companyAdditionalInfoStatus"] = "In Progress";
        dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
      }
    }
  }, [additionalCompamnyForm]);

  return (
    <>
      <Formik
        innerRef={additionalCompamnyForm}
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={handleClickNextStep}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ isValid, ...props }) => {
          return (
            <Form>
              <div className={classes.additionalCompanyInfoContainer}>
                <div className={classes.companyInfoDetailWrapper}>
                  <div className={classes.companyNameinfoContainer}>
                    <ColoredAvatar fullName={companyName} color={"#FDE7E8"} textColor={"#757575"}>
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
