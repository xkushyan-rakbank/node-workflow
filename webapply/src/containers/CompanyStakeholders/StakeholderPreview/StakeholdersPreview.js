/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { format } from "date-fns";
import cx from "classnames";

import { useStyles } from "../components/CompanyStakeholders/styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { NEXT, formStepper, operatorLoginScheme } from "../../../constants";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/credit_score.svg";
import routes from "../../../routes";
import { OverlayLoader } from "../../../components/Loader";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../FormLayout";
import { useViewId } from "../../../utils/useViewId";
import {
  getAccordionStatuses,
  getDatalist,
  getProspect,
  getProspectId
} from "../../../store/selectors/appConfig";
import { getLoginResponse } from "../../../store/selectors/loginSelector";
import { updateProspect } from "../../../store/actions/appConfig";
import {
  getSearchResults,
  getSearchResultsStatuses
} from "../../../store/selectors/searchProspect";
import { OPE_EDIT } from "../../AgentPages/SearchedAppInfo/constants";
import { CustomerReviewDetails } from "./components/CustomerReviewDetailsNew";
import { OperatorReviewDetails } from "./components/OperatorReviewDetailsNew";

export const StakeholdersPreview = ({ sendProspectToAPI }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const { scheme } = useSelector(getLoginResponse);
  const dispatch = useDispatch();
  const prospect = useSelector(getProspect);
  const prospectId = useSelector(getProspectId);
  const prospectLists = useSelector(getSearchResultsStatuses);
  const accordionStatuses = useSelector(getAccordionStatuses);

  const statuses = JSON.parse(accordionStatuses);
  const searchResults = useSelector(getSearchResults);
  const currentProspect = searchResults.find(item => item.prospectId === prospectId);

  const isFrontCorrection = get(currentProspect, "status.statusType") === OPE_EDIT;
  const isOperator = scheme === operatorLoginScheme;
  const isEditable = isOperator && isFrontCorrection || true;
  const { signatoryInfo } = prospect;

  const [displayFields, setDisplayFields] = useState({});

  const { nationality } = useSelector(getDatalist);

  const getNationalityLabel = useCallback(
    code => nationality?.find(nationality => nationality.code === code)?.displayText,
    [displayFields, nationality]
  );

  const [isLoading, setIsLoading] = useState(false);

  const formatEidNumber = number => {
    const cleanNumber = String(number).replace(/\D/g, "");

    const formattedNumber = cleanNumber.replace(/(\d{3})(\d{4})(\d{7})(\d{1})/, "$1-$2-$3-$4");

    return formattedNumber;
  };

  const formatDate = useCallback(date => (date ? format(new Date(date), "dd/MM/yyyy") : ""), [
    displayFields
  ]);

  const handleClickStakeholderPreviewNextStep = useCallback(() => {
    setIsLoading(true);
    const { signatoryInfo } = prospect;
    const fullName = `${signatoryInfo[0].editedFullName}`;
    const editedName =
      fullName.length > 19 ? signatoryInfo[0].editedFullName.split(" ")[0] : fullName;
    const nameOnCard = editedName.length > 19 ? editedName.subString(0, 18) : editedName;
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].debitCardInfo.authSignatoryDetails.nameOnDebitCard": nameOnCard
      })
    );
    return sendProspectToAPI(NEXT).then(
      isScreeningError => {
        if (!isScreeningError) {
          pushHistory(routes.StakeholderTermsAndConditions, true);
        }
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  useEffect(() => {
    if (prospect) {
      const { signatoryInfo } = prospect;
      const fields = {
        signatoryFullName: signatoryInfo && signatoryInfo[0]?.editedFullName,
        signatoryNationality:
          signatoryInfo && getNationalityLabel(signatoryInfo[0]?.kycDetails?.nationality),
        dateOfBirth: signatoryInfo && formatDate(signatoryInfo[0]?.kycDetails?.dateOfBirth),
        eidNumber:
          signatoryInfo &&
          formatEidNumber(signatoryInfo[0]?.kycDetails?.emirateIdDetails?.eidNumber),
        eidExpiryDt:
          signatoryInfo && formatDate(signatoryInfo[0]?.kycDetails?.emirateIdDetails?.eidExpiryDt),
        passportNumber:
          signatoryInfo && signatoryInfo[0]?.kycDetails?.passportDetails[0].passportNumber,
        passportIssueDate:
          signatoryInfo &&
          formatDate(signatoryInfo[0]?.kycDetails?.passportDetails[0].passportIssueDate),
        passportExpiryDate:
          signatoryInfo &&
          formatDate(signatoryInfo[0]?.kycDetails?.passportDetails[0].passportExpiryDate)
      };
      setDisplayFields(fields);
    }
  }, [prospect]);

  useEffect(() => {
    const prospectStatus = (prospectLists.find(status => status.prospectId === prospectId) || {})
      .statusType;
    const isFrontendCorrection = prospectStatus === OPE_EDIT;
    const isOperator = scheme === operatorLoginScheme;
    if (isFrontendCorrection && isOperator) {
      statuses["addionalStakeholderInfoStatus"] = "In Progress";
      statuses["companyAdditionalInfoStatus"] = "In Progress";
    }
    dispatch(updateProspect({ "prospect.accordionsStatus": JSON.stringify(statuses) }));
  }, []);

  return (
    <>
      <div className={classes.completedScanInfoWrapper}>
        <SuccessIcon />
        <span>Scanning successfully completed</span>
      </div>
      {isEditable ? (
        <>
          <h3 className={classes.mainTitle}>Did we get everything?</h3>
          <p className={cx(classes.subTitle, classes["mb-40"])}>
            Take a minute to review the details we pulled from your documents. You won't be able to
            make any changes after this step.
          </p>
        </>
      ) : (
        <>
          <h3 className={classes.mainTitle}>Review the details we pulled from your documents</h3>
          <p className={cx(classes.subTitle, classes["mb-40"])}>
            These will be submitted with your application.
          </p>
        </>
      )}

      {!isEditable ? (
        <CustomerReviewDetails
          customerData={displayFields}
          onClickNextSubmit={handleClickStakeholderPreviewNextStep}
        />
      ) : (
        <OperatorReviewDetails
          isEditable={isEditable}
          customerData={displayFields}
          signatoryDetails={signatoryInfo}
          onClickNextSubmit={handleClickStakeholderPreviewNextStep}
        />
      )}
      <OverlayLoader open={isLoading} text={"Don't go anywhere...this will just take a minute!"} />
    </>
  );
};
