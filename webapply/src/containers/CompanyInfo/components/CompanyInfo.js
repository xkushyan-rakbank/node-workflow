import React, { useEffect, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
import uniqueId from "lodash/uniqueId";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addDays } from "date-fns";
import routes from "../../../routes";
import { useStyles } from "./styled";

import { BackLink } from "../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { DocumentUpload } from "./DocumentUpload";
import { SectionTitle } from "../../../components/SectionTitle";
import { CompanyDetails } from "./CompanyDetails";
import { Industry } from "./Industry";

import {
  getCompanyDocuments,
  getIsIslamicBanking,
  getOrganizationInfo,
} from "../../../store/selectors/appConfig";

import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";
import { checkIsTrimmed } from "../../../utils/validation";
import { MAX_COMPANY_FULL_NAME_LENGTH, MAX_COMPANY_SHORT_NAME_LENGTH } from "../constants";
import { initDocumentUpload, uploadDocuments } from "../../../store/actions/uploadDocuments";
import { TradeLicenceInformation } from "./TradeLicenceInformation";
import { MOA_FILE_SIZE, TL_COI_FILE_SIZE } from "../../../constants";
import useDynamicValidation from "../../../utils/useDynamicValidation";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";

const CompanyDocumentKeys = {
  Moa: "prospect.prospectDocuments.companyDocument.moa",
  TradeLicenseOrCOI: "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI",
};

export const CompanyInfo = ({
  isComeFromROScreens,
  isAllStepsCompleted,
  isLoading,
  handleClickNextStep,
  showLoading,
}) => {
  const dispatch = useDispatch();
  const conditionalSchema = useDynamicValidation();

  const classes = useStyles();

  const isIslamicBanking = useSelector(getIsIslamicBanking);

  const orgDetails = useSelector(getOrganizationInfo) || {};
  const industries = orgDetails.industryMultiSelect || [];

  const datalistId = isIslamicBanking ? "islamicIndustry" : "industry";

  const companyDocuments = useSelector(getCompanyDocuments) || [];
  const tradeLicenseOrCOI = useMemo(
    () => companyDocuments.some((doc) => doc.documentKey === CompanyDocumentKeys.TradeLicenseOrCOI),
    [companyDocuments]
  );
  const moa = useMemo(
    () => companyDocuments.some((doc) => doc.documentKey === CompanyDocumentKeys.Moa),
    [companyDocuments]
  );

  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  const initialValues = {
    companyName: "",
    shortName: "",
    companyCategory: "",
    tradeLicenseOrCOI,
    moa,
    licenseIssuingAuthority: "",
    countryOfIncorporation: "",
    licenseOrCOINumber: "",
    licenseOrCOIExpiryDate: "",
    dateOfIncorporation: "",
    industries:
      get(industries, "[0].industry[0].length", 0) > 0
        ? industries[0].industry.map((item, index) => ({
            industry: item,
            subCategory: industries[0].subCategory[index],
            id: uniqueId(),
          }))
        : industries.map((item) => ({
            ...item,
            id: uniqueId(),
          })),
  };

  const companyInfoSchema = {
    companyName: Yup.string()
      .required(getRequiredMessage("Company name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed"),
    shortName: Yup.string()
      .required(getRequiredMessage("Company short name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_SHORT_NAME_LENGTH, "Maximum ${max} characters allowed")
      .test("space validation", getInvalidMessage("Company short name"), checkIsTrimmed),
    companyCategory: Yup.string().required(getRequiredMessage("Company category")),
    industries: Yup.array().of(
      Yup.object().shape({
        industry: Yup.string().required(getRequiredMessage("Industry")),
        subCategory: Yup.string().when("industry", {
          is: (industry) => !!industry,
          then: Yup.string().required(getRequiredMessage("Sub-category")),
        }),
      })
    ),
    moa: Yup.mixed()
      .test("required", getRequiredMessage("MOA"), (file) => {
        if (file) return true;
        return false;
      })
      .test("fileSize", "The file is too large", (file) => {
        return (
          file &&
          (file === true ||
            (file.size >= MOA_FILE_SIZE.minSize && file.size <= MOA_FILE_SIZE.maxSize))
        );
      }),
    licenseIssuingAuthority: Yup.string().required(getRequiredMessage("Trading issuing authority")),
    countryOfIncorporation: Yup.string().required(getRequiredMessage("Country or incorporation")),
    licenseOrCOINumber: Yup.string()
      .required(getRequiredMessage("License Or COINumber"))
      .matches(/^[a-zA-Z0-9./\- ]+$/, {
        message: "Invalid Format",
      }),
    licenseOrCOIExpiryDate: Yup.date()
      .nullable()
      .min(addDays(new Date(), 9), getInvalidMessage("License or COI expiry date"))
      .typeError(getInvalidMessage("License or COI expiry date"))
      .required(getRequiredMessage("License or COI expiry date")),
    dateOfIncorporation: Yup.date()
      .nullable()
      .typeError(getInvalidMessage("Date Of Incorporation"))
      .required(getRequiredMessage("Date Of Incorporation")),
    tradeLicenseOrCOI: Yup.mixed()
      .test("required", getRequiredMessage("Trade License Or COI"), (file) => {
        if (file) return true;
        return false;
      })
      .test("fileSize", "The file is too large", (file) => {
        return (
          file &&
          (file === true ||
            (file.size >= TL_COI_FILE_SIZE.minSize && file.size <= TL_COI_FILE_SIZE.maxSize))
        );
      }),
  };

  function onUploadSuccess(props) {
    handleClickNextStep();
  }

  const handleClick = (props) => {
    showLoading(true);
    dispatch(
      uploadDocuments({
        docs: {
          "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": props.tradeLicenseOrCOI,
          "prospect.prospectDocuments.companyDocument.moa": props.moa,
        },
        documentSection: "companyDocuments",
        onSuccess: () => onUploadSuccess(props),
        onFailure: () => showLoading(false),
      })
    );
  };

  return (
    <>
      <SectionTitleWithInfo
        title={"Tell us about your company"}
        info="This will help us get your account set up properly"
        smallInfo
      />
      <Formik
        initialValues={initialValues}
        validationSchema={conditionalSchema(companyInfoSchema)}
        validateOnChange={true}
        onSubmit={handleClick}
      >
        {(props) => (
          <Form>
            <div>
              <SectionTitle
                title={"Upload company documents"}
                classes={{ wrapper: classes.title }}
              />
              <DocumentUpload {...props} />
            </div>
            <Divider className={classes.divider} />
            <div>
              <SectionTitle title={"Company details"} classes={{ wrapper: classes.title }} />
              <CompanyDetails {...props} />
            </div>
            <Divider className={classes.divider} />
            <div>
              <SectionTitle title={"Industry"} classes={{ wrapper: classes.title }} />
              <Industry datalistId={datalistId} {...props} />
            </div>
            <Divider className={classes.divider} />
            <div>
              <SectionTitle
                title={"Trade licence information"}
                classes={{ wrapper: classes.title }}
              />
              <TradeLicenceInformation {...props} />
            </div>
            <div className={`linkContainer ${!isComeFromROScreens ? "oneElement" : ""}`}>
              {isComeFromROScreens && <BackLink path={routes.searchProspect} />}
              <NextStepButton
                justify="flex-end"
                display="block"
                label="Next"
                disabled={!(props.isValid && props.dirty)}
                // handleClick={() => handleClick(props)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
