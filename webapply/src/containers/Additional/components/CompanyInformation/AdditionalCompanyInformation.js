/* eslint-disable no-unused-vars */
import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../../FormLayout";
import { formStepper } from "../../../../constants";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { ICONS, Icon } from "../../../../components/Icons";
import { ColoredAvatar } from "../../../../components/Avatar/ColoredAvatar";
import { BusinessRelationship } from "./components/Business";
import { FinancialTurnoverSection } from "./components/FinancialTurnoverSection";
import { MailingAddressSection } from "./components/MailingAddressSection";
import { TaxDeclarationsSection } from "./components/TaxDeclarationsSection";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";

import { useStyles } from "../styled";

export const AddCompanyInformation = ({ companyName, topCustomers, topSuppliers }) => {
  const classes = useStyles();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);

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

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ isValid, ...props }) => {
          return (
            <Form>
              <div className={classes.additionalCompanyInfoContainer}>
                <div>
                  <BackLink path={routes.additionalInfoComponent} />
                  <div className={classes.infoContainer}>
                    <Icon className={classes.infoIcon} alt="collapse-icon" name={ICONS.info} />
                    We need the information below to understand your business needs.
                  </div>
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
                      {...props}
                    />
                    <FinancialTurnoverSection id={"isFinancialTurnoverCompleted"} {...props} />
                    <MailingAddressSection id={"isMailingAddressCompleted"} {...props} />
                    <TaxDeclarationsSection id={"isTaxDeclarationCompleted"} {...props} />
                  </div>
                </div>
                <div className="linkContainer">
                  <NextStepButton justify="flex-end" label="Continue" disabled={!isValid} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
