import React from "react";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { ConfirmDialog } from "../../../../components/Modals";
import routes from "../../../../routes";

import { searchedAppInfoSteps, CONFIRM_MESSAGE } from "./../constants";
import { useStyles } from "./../styled";
import { Footer } from "../../../../components/Footer";

export const SearchedAppInfoComponent = ({
  fullName,
  createSetStepHandler,
  prospectOverview,
  signatoryInfo,
  searchResult,
  redirectUserPage,
  isDisplayConfirmDialog,
  isDisabled,
  confirmHandler,
  confirmDialogHandler,
  step
}) => {
  const [firstName, lastName] = fullName.split(/\s/);
  const classes = useStyles();

  return (
    <>
      <h2>Application Details</h2>
      <p className="formDescription" />
      <FormCard
        firstName={firstName}
        lastName={lastName}
        content={<div className={classes.title}>{fullName}</div>}
      >
        <div className={classes.formContent}>
          {searchedAppInfoSteps.map(item => {
            return (
              <StepComponent
                key={item.step}
                title={item.title}
                subTitle={item.infoTitle}
                isActiveStep={step === item.step}
                isFilled={true}
                handleClick={createSetStepHandler(item.step)}
                hideContinue={true}
                stepForm={item.component}
                searchResult={searchResult}
                prospectOverview={prospectOverview}
                signatoryInfo={signatoryInfo}
              />
            );
          })}
        </div>
      </FormCard>
      <Footer>
        <BackLink path={routes.searchProspect} />
        <SubmitButton
          label="Edit"
          justify="flex-end"
          handleClick={redirectUserPage}
          disabled={isDisabled}
        />
      </Footer>

      <ConfirmDialog
        title={"Are you sure?"}
        isOpen={isDisplayConfirmDialog}
        handleConfirm={confirmHandler}
        handleReject={confirmDialogHandler}
        handleClose={confirmDialogHandler}
        message={CONFIRM_MESSAGE}
      />
    </>
  );
};
