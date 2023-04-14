import React from "react";

import { Divider } from "@material-ui/core";

import routes from "../../../routes";
import { useStyles } from "./styled";

import { BackLink } from "../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { DocumentUpload } from "./DocumentUpload";
import { SectionTitle } from "../../../components/SectionTitle";
import { CompanyDetails } from "./CompanyDetails";

export const CompanyInfo = ({
  isComeFromROScreens,
  isAllStepsCompleted,
  isLoading,
  handleClickNextStep
}) => {
  const classes = useStyles();

  return (
    <>
      <h2 className={classes.pageTitle}>Tell us about your company</h2>
      <p className={classes.subTitle}>This will help us get your account set up properly</p>
      <div>
        <SectionTitle title={"Upload company documents"} classes={{ wrapper: classes.title }} />
        <DocumentUpload />
      </div>
      <Divider className={classes.divider} />
      <div>
        <SectionTitle title={"Company details"} classes={{ wrapper: classes.title }} />
        <CompanyDetails />
      </div>
      <Divider className={classes.divider} />

      <div className="linkContainer">
        {isComeFromROScreens && <BackLink path={routes.searchProspect} />}
        <NextStepButton
          justify="flex-end"
          label="Next Step"
          disabled={!isAllStepsCompleted}
          isDisplayLoader={isLoading}
          handleClick={handleClickNextStep}
        />
      </div>
    </>
  );
};
