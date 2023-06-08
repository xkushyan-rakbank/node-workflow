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
import { formStepper } from "../../../../constants";
import { getAccountType, getIsIslamicBanking } from "../../../../store/selectors/appConfig";
import { wcmClient } from "../../../../api/axiosConfig";
import { log } from "../../../../utils/loggger";

const StakeholderTermsAndConditions = () => {
  const [pdfLink, setPdfLink] = useState(null);
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const accountType = useSelector(getAccountType);
  const isIslamic = useSelector(getIsIslamicBanking);

  const goToAdditional = useCallback(() => {
    pushHistory(routes.additionalInfoComponent, true);
  }, [pushHistory]);

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
          setPdfLink(selectedAccountTypePdfLink);
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

      <StakeholderKfs pdfLink={pdfLink} />
      <StakeholderAuthorisations pdfLink={pdfLink} />
      <TermsAndConditions pdfLink={pdfLink} />

      <div className="linkContainer">
        <NextStepButton
          type="button"
          onClick={() => goToAdditional()}
          disabled={false}
          label="Next"
          justify="flex-end"
        />
      </div>
    </>
  );
};

export default StakeholderTermsAndConditions;
