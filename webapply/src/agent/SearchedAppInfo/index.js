import React, { useState, useEffect, useCallback } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import * as searchResultSelector from "./../../store/selectors/searchProspect";
import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import { searchedAppInfoSteps } from "../../constants";
import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import * as loginSelector from "./../../store/selectors/loginSelector";
import { BackLink } from "../../components/Buttons/BackLink";
import { retrieveDocDetails } from "./../../store/actions/getProspectDocuments";
import { getProspectInfo } from "./../../store/actions/retrieveApplicantInfo";
import { receiveAppConfig, updateProspectId } from "./../../store/actions/appConfig";
import ConfirmDialog from "../../components/ConfirmDialod";
import { useStyles } from "./styled";

const SearchedAppInfo = ({
  index = 0,
  searchResults,
  match,
  updateProspectId,
  retrieveDocDetails,
  receiveAppConfig,
  getProspectInfo
}) => {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [editClicked, setEditClicked] = useState(false);

  useEffect(() => {
    updateProspectId(match.params.id);
    retrieveDocDetails();
  }, [updateProspectId, retrieveDocDetails, match.params.id]);

  const redirectUserPage = useCallback(() => {
    setEditClicked(true);
  }, [setEditClicked]);

  const confirmHandler = useCallback(() => {
    receiveAppConfig();
    getProspectInfo(match.params.id);
  }, [receiveAppConfig, getProspectInfo, match.params.id]);

  const closeConfirmDialog = useCallback(() => {
    setEditClicked(false);
  }, [setEditClicked]);

  const prospectInfo = searchResults.searchResult
    ? searchResults.searchResult.find(item => item.prospectId === match.params.id)
    : {};

  return prospectInfo ? (
    <>
      <h2>Application Details</h2>
      <p className="formDescription"></p>
      <CompanyStakeholderCard
        content={
          <>
            <div className={classes.title}>{get(prospectInfo, "applicantInfo.fullName", "")}</div>
          </>
        }
      >
        <div className={classes.formContent}>
          {searchedAppInfoSteps.map(item => {
            const clickSetStep = () => setStep(item.step);
            return (
              <StepComponent
                index={index}
                key={item.step}
                stepForm={item.component}
                title={item.title}
                subTitle={item.infoTitle}
                activeStep={step === item.step}
                filled={false}
                clickHandler={clickSetStep}
                hideContinue={true}
                prospectInfo={prospectInfo}
              />
            );
          })}
        </div>
      </CompanyStakeholderCard>
      <div className="linkContainer">
        <BackLink path={routes.searchProspect} />
        <SubmitButton label="Edit" justify="flex-end" handleClick={redirectUserPage} />
      </div>
      {editClicked && (
        <ConfirmDialog
          isOpen={true}
          handler={confirmHandler}
          handleClose={closeConfirmDialog}
          id="Search.editMessage"
        />
      )}
    </>
  ) : (
    <></>
  );
};

const mapStateToProps = state => ({
  searchResults: searchResultSelector.getSearchResult(state),
  checkLoginStatus: loginSelector.checkLoginStatus(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo,
  receiveAppConfig,
  updateProspectId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedAppInfo);
