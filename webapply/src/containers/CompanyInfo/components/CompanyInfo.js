import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
import uniqueId from "lodash/uniqueId";

import { Divider } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import routes from "../../../routes";
import { useStyles } from "./styled";

import { BackLink } from "../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { DocumentUpload } from "./DocumentUpload";
import { SectionTitle } from "../../../components/SectionTitle";
import { CompanyDetails } from "./CompanyDetails";
import { Industry } from "./Industry";

import { getIsIslamicBanking, getOrgKYCDetails } from "../../../store/selectors/appConfig";

import { getInvalidMessage, getRequiredMessage } from "../../../utils/getValidationMessage";
import { checkIsTrimmed } from "../../../utils/validation";
import { MAX_COMPANY_FULL_NAME_LENGTH, MAX_COMPANY_SHORT_NAME_LENGTH } from "../constants";
import { initDocumentUpload, uploadDocuments } from "../../../store/actions/uploadDocuments";
import { TradeLicenceInformation } from "./TradeLicenceInformation";

export const CompanyInfo = ({
  isComeFromROScreens,
  isAllStepsCompleted,
  isLoading,
  handleClickNextStep
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const isIslamicBanking = useSelector(getIsIslamicBanking);

  const orgDetails = useSelector(getOrgKYCDetails) || {};
  const industries = orgDetails.industryMultiSelect || [];

  const datalistId = isIslamicBanking ? "islamicIndustry" : "industry";

  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  const initialValues = {
    companyName: "",
    shortName: "",
    companyCategory: "",
    tradeLicenseOrCOI: "",
    moa: "",
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

  const companyDetailsSchema = () =>
    Yup.object({
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
            is: industry => !!industry,
            then: Yup.string().required(getRequiredMessage("Sub-category"))
          })
        })
      )
    });

  const handleClick = values => {
    dispatch(
      uploadDocuments({
        docs: {
          "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": values.tradeLicenseOrCOI,
          "prospect.prospectDocuments.companyDocument.moa": values.moa
        },
        documentSection: "companyDocuments"
      })
    );
    // // dispatch(uploadDocument())
    // handleClickNextStep();
  };

  return (
    <>
      <h2 className={classes.pageTitle}>Tell us about your company</h2>
      <p className={classes.subTitle}>This will help us get your account set up properly</p>
      <Formik
        initialValues={initialValues}
        validationSchema={companyDetailsSchema}
        validateOnChange={false}
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
            <div className="linkContainer">
              {isComeFromROScreens && <BackLink path={routes.searchProspect} />}
              <NextStepButton
                justify="flex-end"
                label="Next"
                disabled={false}
                isDisplayLoader={isLoading}
                handleClick={() => handleClick(props.values)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
