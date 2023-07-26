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
  getOrganizationInfo
} from "../../../store/selectors/appConfig";

import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";
import { MAX_COMPANY_FULL_NAME_LENGTH } from "../constants";
import { initDocumentUpload } from "../../../store/actions/uploadDocuments";
import { TradeLicenceInformation } from "./TradeLicenceInformation";
import { MOA_FILE_SIZE, TL_COI_FILE_SIZE } from "../../../constants";
import useDynamicValidation from "../../../utils/useDynamicValidation";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { useFindDocument } from "../../../utils/useFindDocument";

const CompanyDocumentKeys = {
  Moa: "prospect.prospectDocuments.companyDocument.moa",
  TradeLicenseOrCOI: "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI"
};

export const CompanyInfo = ({
  isComeFromROScreens,
  isAllStepsCompleted,
  isLoading,
  handleClickNextStep,
  showLoading
}) => {
  const dispatch = useDispatch();
  const conditionalSchema = useDynamicValidation();
  const { industry, subCategory } = useSelector(getOrganizationInfo);
  const classes = useStyles();

  const isIslamicBanking = useSelector(getIsIslamicBanking);

  const orgDetails = useSelector(getOrganizationInfo) || {};
  const industries = orgDetails.industryMultiSelect || [];

  const datalistId = isIslamicBanking ? "islamicIndustry" : "industry";

  const companyDocuments = useSelector(getCompanyDocuments) || [];
  const tradeLicenseOrCOI = useFindDocument(
    companyDocuments,
    CompanyDocumentKeys.TradeLicenseOrCOI
  );
  const moa = useFindDocument(companyDocuments, CompanyDocumentKeys.Moa);

  console.log();
  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  const initialValues = {
    companyName: "",
    shortName: "",
    companyCategory: "",
    tradeLicenseOrCOI: tradeLicenseOrCOI && tradeLicenseOrCOI[0],
    moa: moa && moa[0],
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
          id: uniqueId()
        }))
        : industries.map(item => ({
          ...item,
          id: uniqueId()
        })),
    ...(industry && {
      "prospect.organizationInfo.industryMultiSelect.industry": industry && industry[0]
    }),
    ...(subCategory && {
      "prospect.organizationInfo.industryMultiSelect.subCategory": subCategory && subCategory[0]
    })
  };

  const companyInfoSchema = {
    companyName: Yup.string()
      .required(getRequiredMessage("Company name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed"),
    companyCategory: Yup.string().required(getRequiredMessage("Company category")),
    industries: Yup.array().of(
      Yup.object().shape({
        industry: Yup.string().required(getRequiredMessage("Industry")),
        subCategory: Yup.string().when("industry", {
          is: industry => !!industry,
          then: Yup.string().required(getRequiredMessage("Sub-category"))
        })
      })
    ),
    moa: Yup.mixed()
      .test("required", getRequiredMessage("MOA"), file => {
        if (file) return true;
        return false;
      })
      .test("fileSize", "The file is too large", file => {
        return (
          file &&
          (file === true ||
            (file.fileSize >= MOA_FILE_SIZE.minSize && file.fileSize <= MOA_FILE_SIZE.maxSize))
        );
      }),
    licenseIssuingAuthority: Yup.string().required(getRequiredMessage("Trading issuing authority")),
    countryOfIncorporation: Yup.string().required(getRequiredMessage("Country or incorporation")),
    licenseOrCOINumber: Yup.string()
      .required(getRequiredMessage("License Or COINumber"))
      .matches(/^[a-zA-Z0-9./\- ]+$/, {
        message: "Invalid Format"
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
      .test("required", getRequiredMessage("Trade License Or COI"), file => {
        if (file) return true;
        return false;
      })
      .test("fileSize", "The file is too large", file => {
        return (
          file &&
          (file === true ||
            (file.fileSize >= TL_COI_FILE_SIZE.minSize &&
              file.fileSize <= TL_COI_FILE_SIZE.maxSize))
        );
      })
  };

  function onUploadSuccess(props) {
    handleClickNextStep();
  }

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
        onSubmit={onUploadSuccess}
      >
        {props => (
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
