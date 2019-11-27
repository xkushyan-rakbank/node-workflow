import React, { useState, useEffect, useCallback } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { getSearchResult } from "../../store/selectors/searchProspect";
import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import { searchedAppInfoSteps } from "../../constants";
import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { retrieveDocDetails } from "../../store/actions/getProspectDocuments";
import { getProspectInfo } from "../../store/actions/retrieveApplicantInfo";
import { updateProspectId } from "../../store/actions/appConfig";
import { ConfirmDialog } from "../../components/Modals";
import { useStyles } from "./styled";

const disableArrayValues = ["Account activated", "Declined", "Ineligible"];

const SearchedAppInfo = ({
  searchResults,
  match,
  updateProspectId,
  retrieveDocDetails,
  getProspectInfo
}) => {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);

  useEffect(() => {
    updateProspectId(match.params.id);
    retrieveDocDetails();
  }, [updateProspectId, retrieveDocDetails, match.params.id]);

  const redirectUserPage = useCallback(() => {
    setIsDisplayConfirmDialog(true);
  }, [setIsDisplayConfirmDialog]);

  const confirmHandler = useCallback(() => {
    getProspectInfo(match.params.id);
  }, [getProspectInfo, match.params.id]);

  const confirmDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
  }, [setIsDisplayConfirmDialog]);

  const prospectInfo = (searchResults.searchResult || []).find(
    item => item.prospectId === match.params.id
  );

  if (!prospectInfo) {
    return null;
  }

  let isDisable = false;

  isDisable = disableArrayValues.indexOf(prospectInfo.status.statusNotes) > -1;

  return (
    <>
      <h2>Application Details</h2>
      <p className="formDescription"></p>
      <CompanyStakeholderCard
        content={
          <div className={classes.title}>{get(prospectInfo, "applicantInfo.fullName", "")}</div>
        }
      >
        <div className={classes.formContent}>
          {searchedAppInfoSteps.map(item => {
            return (
              <StepComponent
                key={item.step}
                stepForm={item.component}
                title={item.title}
                subTitle={item.infoTitle}
                activeStep={step === item.step}
                filled={false}
                clickHandler={() => setStep(item.step)}
                hideContinue={true}
                prospectInfo={prospectInfo}
              />
            );
          })}
        </div>
      </CompanyStakeholderCard>
      <div className="linkContainer">
        <BackLink path={routes.searchProspect} />
        <SubmitButton
          label="Edit"
          justify="flex-end"
          handleClick={redirectUserPage}
          disabled={isDisable}
        />
      </div>
      <ConfirmDialog
        isOpen={isDisplayConfirmDialog}
        handleConfirm={confirmHandler}
        handleReject={confirmDialogHandler}
        handleClose={confirmDialogHandler}
        message="Editing the application will result in re-performing the pre-screening checks and might change the results."
      />
    </>
  );
};

const mapStateToProps = state => ({
  searchResults: getSearchResult(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo,
  updateProspectId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfo);
