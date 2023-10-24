import React, { useEffect, useRef } from "react";
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
import { TradeLicenceInformation } from "./TradeLicenceInformation";
import { MOA_FILE_SIZE, TL_COI_FILE_SIZE } from "../../../constants";
import useDynamicValidation from "../../../utils/useDynamicValidation";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { useFindDocument } from "../../../utils/useFindDocument";
import { Footer } from "../../../components/Footer";
import { scrollToDOMNode } from "../../../components/VerticalPagination";

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
  const classes = useStyles();
  const companyInfoForm = useRef(null);
  const documentUploadSectionRef = useRef(null);

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
  const refToTopOfCompanyInfo = useRef(null);

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
          }))
  };

  const companyInfoSchema = {
    tradeLicenseOrCOI: Yup.mixed()
      .test("required", getRequiredMessage("This field"), file => {
        if (file) return true;
        return false;
      })
      .test(
        "fileSize",
        "The file size is too big. Please upload a file less than or equal to 10MB.",
        file => {
          return (
            file &&
            (file === true ||
              (file.fileSize >= TL_COI_FILE_SIZE.minSize &&
                file.fileSize <= TL_COI_FILE_SIZE.maxSize))
          );
        }
      ),
    moa: Yup.mixed()
      .test("required", getRequiredMessage("This field"), file => {
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
    licenseIssuingAuthority: Yup.string().required(
      getRequiredMessage("License Issuance Authority")
    ),
    countryOfIncorporation: Yup.string().required(getRequiredMessage("Country of incorporation")),
    licenseOrCOINumber: Yup.string()
      .required(getRequiredMessage("License number"))
      .matches(/^[a-zA-Z0-9./\- ]+$/, {
        message: getInvalidMessage("License number")
      }),
    licenseOrCOIExpiryDate: Yup.date()
      .required(getRequiredMessage("License expiry date"))
      .test(
        "minDate",
        "This expiration date has already passed. Please select a valid date.",
        value => {
          if (!value) return false;
          const inputDate = new Date(value);
          return inputDate.getTime() >= addDays(new Date(), 9);
        }
      )
      .typeError(getInvalidMessage("License expiry date")),
    dateOfIncorporation: Yup.date()
      .required(getRequiredMessage("Date Of incorporation"))
      .test(
        "maxDate",
        "The date of incorporation cannot be a future date. Please select a valid date.",
        value => {
          if (!value) return false;
          const inputDate = new Date(value);
          return inputDate.getTime() < addDays(new Date(), 0);
        }
      )
      .typeError(getInvalidMessage("Date of incorporation"))
  };


  useEffect(() => {
    if (!companyInfoForm.current?.setFieldValue) {
      return;
    }
    const industry = get(orgDetails, "industryMultiSelect[0].industry", null);
    const subCategory = get(orgDetails, "industryMultiSelect[0].subCategory", null);
    companyInfoForm.current.setFieldValue(
      "prospect.organizationInfo.industryMultiSelect.industry",
      industry[0]
    );
    companyInfoForm.current.setFieldValue(
      "prospect.organizationInfo.industryMultiSelect.subCategory",
      subCategory[0]
    );
  }, [companyInfoForm, orgDetails]);

  return (
    <div className={classes.companyInfoWrapper} ref={refToTopOfCompanyInfo}>
      <SectionTitleWithInfo
        title={"Tell us about your company"}
        info="We just need a few details about your company to set up your account. Please complete all fields accurately so that we can process your application as smoothly as possible."
        smallInfo
      />
      <Formik
        initialValues={initialValues}
        validationSchema={conditionalSchema(companyInfoSchema)}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={handleClickNextStep}
        innerRef={companyInfoForm}
      >
        {props => {
          if (props.isSubmitting) {
            const fieldErrorNames = Object.keys(props.errors);
            if (fieldErrorNames.length > 0) {
              if (fieldErrorNames[0] === "tradeLicenseOrCOI" || fieldErrorNames[0] === "moa") {
                scrollToDOMNode(documentUploadSectionRef);
              } else {
                const el =
                  document.querySelector(`input[name='${fieldErrorNames[0]}']`) ||
                  document.querySelector(".Mui-error");
                const element = el && el.parentElement ? el.parentElement : el;
                element && element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }
          return (
            <Form className={classes.companyInfoSectionForm}>
              <div className={classes.companyInfoSectionWrapper} ref={documentUploadSectionRef}>
                <SectionTitle
                  title={"Upload company documents"}
                  classes={{ wrapper: classes.title }}
                />
                <Divider className={classes.divider} />
                <DocumentUpload {...props} />
              </div>
              <div className={classes.companyInfoSectionWrapper}>
                <SectionTitle title={"Company details"} classes={{ wrapper: classes.title }} />
                <Divider className={classes.divider} />
                <CompanyDetails {...props} />
              </div>

              <div className={classes.companyInfoSectionWrapper}>
                <SectionTitle title={"Industry"} classes={{ wrapper: classes.title }} />
                <Divider className={classes.divider} />
                <Industry datalistId={datalistId} {...props} />
              </div>
              <div className={classes.companyInfoSectionWrapper}>
                <SectionTitle
                  title={"Trade licence information"}
                  classes={{ wrapper: classes.title }}
                />
                <Divider className={classes.divider} />
                <TradeLicenceInformation {...props} />
              </div>
              <Footer extraClasses={!isComeFromROScreens ? "oneElement" : ""}>
                {isComeFromROScreens && (
                  <BackLink path={routes.searchProspect} isTypeButton={true} />
                )}
                <NextStepButton
                  justify="flex-end"
                  display="block"
                  label="Next"
                  // disabled={!isCompanyInfoValid}
                />
              </Footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
