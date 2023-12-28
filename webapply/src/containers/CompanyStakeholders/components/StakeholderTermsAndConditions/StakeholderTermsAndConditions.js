import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get } from "lodash";

import { useStyles } from "./styled";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { StakeholderKfs } from "./StakeholderKfs";
import routes from "../../../../routes";
import { StakeholderAuthorisations } from "./StakeholderAuthorisations";
import { TermsAndConditions } from "./TermsAndConditions";
import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../../FormLayout";
import { useViewId } from "../../../../utils/useViewId";
import { formStepper, operatorLoginScheme, NEXT } from "../../../../constants";
import {
  getAccountType,
  getIsIslamicBanking,
  getProspectId
} from "../../../../store/selectors/appConfig";
import { wcmClient } from "../../../../api/axiosConfig";
import { log } from "../../../../utils/loggger";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { getIsRoInviteEfr } from "../../../../store/selectors/otp";
import { Footer } from "../../../../components/Footer";
import { ConfirmDialog } from "../../../../components/Modals";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { checkLoginStatus, getLoginResponse } from "../../../../store/selectors/loginSelector";
import { OPE_EDIT } from "../../../AgentPages/SearchedAppInfo/constants";
import { getSearchResults } from "../../../../store/selectors/searchProspect";

export const StakeholdersTermsAndConditions = ({ sendProspectToAPI }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isBrowserBackClickConfirmed, setIsBrowserBackClickConfirmed] = useState(false);
  const [wcmData, setWcmData] = useState(null);
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const history = useHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const accountType = useSelector(getAccountType);
  const isIslamic = useSelector(getIsIslamicBanking);
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const isRoInviteEFR = useSelector(getIsRoInviteEfr);
  const { scheme } = useSelector(getLoginResponse);
  const isAgent = useSelector(checkLoginStatus);
  const searchResults = useSelector(getSearchResults);
  const prospectId = useSelector(getProspectId);
  const currentProspect = searchResults.find(item => item.prospectId === prospectId);

  const isFrontCorrection = get(currentProspect, "status.statusType") === OPE_EDIT;
  const isOperator = scheme === operatorLoginScheme;
  const isEditable = isOperator && isFrontCorrection;

  useEffect(() => {
    const handleBrowserBackBtn = (location, action) => {
      if (action === "POP") {
        setIsBrowserBackClickConfirmed(true);
        return false; // Block the user from going back
      }
      return true; // Allow user navigation for other actions
    };

    const unblock = history.block(handleBrowserBackBtn);

    return () => {
      unblock();
    };
  }, [history]);

  const goToAdditional = useCallback(() => {
    setIsLoading(true);
    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) {
          if (isRoInviteEFR) {
            setOpenModal(true);
          } else {
            pushHistory(routes.additionalInfoComponent, true);
          }
        }
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  useEffect(() => {
    const getTermsandConditions = async () => {
      const URL = `/wcmapi/banking/products/variants?productId=201&productTypeId=${
        isIslamic ? 2 : 1
      }`;
      wcmClient
        .request({
          url: URL,
          method: "GET"
        })
        .then(respose => {
          const selectedAccountTypePdfLink = respose.data.find(
            eachType => eachType.code === accountType
          );
          setWcmData(selectedAccountTypePdfLink);
        })
        .catch(error => {
          log(error);
        });
    };
    getTermsandConditions();
  }, []);

  const handleModalClose = () => {
    setOpenModal(false);
    pushHistory(routes.comeBackLogin);
  };

  const handleBackBtnConfirmModal = () => {
    setIsBrowserBackClickConfirmed(false);
    isAgent ? pushHistory(routes.login) : pushHistory(routes.comeBackLogin);
  };

  return (
    <>
      <ConfirmDialog
        title={"Thank you"}
        isOpen={openModal}
        handleReject={() => {}}
        cancelLabel={"Close"}
        handleClose={() => handleModalClose()}
        message={
          "Your EFR face recognition process has been successfully completed, and you've accepted the KFS terms and conditions."
        }
      />
      <ConfirmDialog
        isOpen={isBrowserBackClickConfirmed}
        handleReject={() => {}}
        cancelLabel={"Stay on this page"}
        handleClose={() => setIsBrowserBackClickConfirmed(false)}
        message={"You will be logged out of the application!"}
        handleConfirm={() => handleBackBtnConfirmModal()}
      />
      <h3 className={classes.mainTitle}>Time for the fine print</h3>
      <p className={classes.kfsSubTitle}>Please review the terms and conditions to continue</p>

      <StakeholderKfs wcmData={wcmData} />
      <StakeholderAuthorisations wcmData={wcmData} />
      <TermsAndConditions wcmData={wcmData} />

      <Footer extraClasses={"oneElement"}>
        {isEditable ? <BackLink path={routes.stakeholdersPreview} isTypeButton={true} /> : null}
        <NextStepButton
          isDisplayLoader={isLoading}
          type="button"
          onClick={() => goToAdditional()}
          disabled={
            !(
              termsAndConditions.kfs &&
              termsAndConditions.generalTCs &&
              termsAndConditions.authorisation
            )
          }
          label={isRoInviteEFR ? "Done" : "Next"}
          justify="flex-end"
        />
      </Footer>
    </>
  );
};
