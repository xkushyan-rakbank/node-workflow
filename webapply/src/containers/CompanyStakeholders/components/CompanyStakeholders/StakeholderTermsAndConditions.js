import React, { useCallback } from "react";
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

export const StakeholderTermsAndConditions = () => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const goToAdditional = useCallback(() => {
    pushHistory(routes.additionalInfoComponent, true);
  }, [pushHistory]);
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);

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
