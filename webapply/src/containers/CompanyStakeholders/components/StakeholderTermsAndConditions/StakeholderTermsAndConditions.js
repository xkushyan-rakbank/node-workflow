import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
import { formStepper, NEXT } from "../../../../constants";
import { getAccountType, getIsIslamicBanking } from "../../../../store/selectors/appConfig";
import { wcmClient } from "../../../../api/axiosConfig";
import { log } from "../../../../utils/loggger";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { getIsRoInviteEfr } from "../../../../store/selectors/otp";

export const StakeholdersTermsAndConditions = ({ sendProspectToAPI }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wcmData, setWcmData] = useState(null);
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const accountType = useSelector(getAccountType);
  const isIslamic = useSelector(getIsIslamicBanking);
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const isRoInviteEFR = useSelector(getIsRoInviteEfr);

  const goToAdditional = useCallback(() => {
    setIsLoading(true);
    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.additionalInfoComponent, true);
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

  return (
    <>
      <h3 className={classes.mainTitle}>Time for the small print</h3>
      <p className={classes.kfsSubTitle}>Please review the terms and conditions to continue</p>

      <StakeholderKfs wcmData={wcmData} />
      <StakeholderAuthorisations wcmData={wcmData} />
      <TermsAndConditions wcmData={wcmData} />

      <div className="linkContainer">
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
      </div>
    </>
  );
};
