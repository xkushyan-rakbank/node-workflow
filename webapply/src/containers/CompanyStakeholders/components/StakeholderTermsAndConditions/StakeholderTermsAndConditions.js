import React, { useCallback, useEffect } from "react";
import axios from "axios";
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
import { wcmClient } from "../../../../api/axiosConfig";

const URL = "/banking/products/variants?productId=201&productTypeId=1";

export const StakeholderTermsAndConditions = () => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);

  const goToAdditional = useCallback(() => {
    pushHistory(routes.additionalInfoComponent, true);
  }, [pushHistory]);

  const getTermsandConditions = async () => {
    // const response = await wcmClient.get(URL);
    const response = await wcmClient.request({
      url: URL,
      method: "GET"
    });
    console.log(response);
  };

  useEffect(() => {
    getTermsandConditions();
  }, []);

  return (
    <>
      <h3 className={classes.mainTitle}>Time for the small print</h3>
      <p className={classes.kfsSubTitle}>Please review the terms and conditions to continue</p>

      <StakeholderKfs />
      <StakeholderAuthorisations />
      <TermsAndConditions />

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
