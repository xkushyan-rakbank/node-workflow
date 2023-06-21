import React from "react";
import { Form, Formik } from "formik";

import routes from "../../../../routes";
import { formStepper } from "../../../../constants";
import { useLayoutParams } from "../../../FormLayout";
import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { ICONS, Icon } from "../../../../components/Icons";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import StakeholdersDetail from "../../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";

import { Background } from "./components/Background";
import { ResidentialAddress } from "./components/ResidentialAddress";
import { StakeholderTaxDeclarations } from "./components/StakeholderTaxDeclaration";
import { SourceOfIncome } from "./components/SourceOfIncome";

import { useStyles } from "../styled";

export const AdditionalStakeholderInformation = ({ stakeholderName, companyCategory }) => {
  const classes = useStyles();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);

  return (
    <>
      <Formik onSubmit={() => {}} validateOnChange={false}>
        {props => {
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
                      <StakeholdersDetail
                        name={stakeholderName}
                        companyCategory={companyCategory}
                      />
                    </div>
                    <Background />
                    <SourceOfIncome />
                    <ResidentialAddress />
                    <StakeholderTaxDeclarations />
                  </div>
                </div>
                <div className="linkContainer">
                  <NextStepButton justify="flex-end" label="Continue" disabled={true} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
