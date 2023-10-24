import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { NEXT, SUBMIT, TL_COI_FILE_SIZE, additionInfoStepper } from "../../constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { useViewId } from "../../utils/useViewId";
import { useStyles } from "./styled";
import StakeholdersDetail from "../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";
import {
  getAdditionalDocumentDetailsForBPM,
  getAdditionalDocumentDetailsFromBPM,
  getAdditionalInfoDetailsFromBPM
} from "../../store/selectors/appConfig";
import { Footer } from "../../components/Footer";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { BackLink } from "../../components/Buttons/BackLink";
import routes from "../../routes";
import AdditionalQuery from "./AdditionalQuery";
import AdditionalDocument from "./AdditionalDocument";
import { OverlayLoader } from "../../components/Loader";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { checkLoginStatus } from "../../store/selectors/loginSelector";

export function AdditionalInformation({ stakeholderName, sendProspectToAPI }) {
  useFormNavigation([false, false, additionInfoStepper, true, false]);
  useLayoutParams(false);
  useViewId(true);
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const [loading, setIsLoading] = useState(false);
  const [additionInfo, setAdditionalInfo] = useState([{}]);
  const [additionalDoc, setAdditionalDoc] = useState("");

  //required detials requestes
  const additionalInfoDetailsFromBPM = useSelector(getAdditionalInfoDetailsFromBPM);
  const additionalDocumentDetailsFromBPM = useSelector(getAdditionalDocumentDetailsFromBPM);

  // sending details back to bpm through update prospect
  // const additionalInfoDetailsForBPM = useSelector(getAdditionalInfoDetailsForBPM);
  const additionalDocumentDetailsForBPM = useSelector(getAdditionalDocumentDetailsForBPM);

  const isAgent = useSelector(checkLoginStatus);

  //set intial values
  useEffect(() => {
    const docList = {};
    const infoList = {};
    additionalDocumentDetailsFromBPM &&
      additionalDocumentDetailsFromBPM.forEach(eachDoc => {
        docList[`doc_${eachDoc.documentUniqueId}`] = [""];
      });
    additionalInfoDetailsFromBPM &&
      additionalInfoDetailsFromBPM.forEach(eachDoc => {
        infoList[`info_${eachDoc.queryUniqueID}`] = "";
      });
    setAdditionalInfo(infoList);
    setAdditionalDoc(docList);
  }, []);

  //useEffect to load on comeback
  // TODO: rework when autosave has to be implemented
  //   useEffect(() => {
  //     const docFiles = {};
  //     if (additionalDocumentDetailsForBPM.length) {
  //       additionalDocumentDetailsForBPM.forEach(eachDoc => {
  //         const { DocUniqueID, DocResponse } = eachDoc;
  //         if (!docFiles[`doc_${DocUniqueID}`]) {
  //           docFiles[`doc_${DocUniqueID}`] = [];
  //         }

  //         // Push the current item to the corresponding array
  //         docFiles[`doc_${DocUniqueID}`].push({
  //           file: DocResponse,
  //           fileName: DocResponse,
  //           fieldDescription: DocResponse,
  //           documentUniqueId: DocUniqueID
  //         });
  //       });
  //       setAdditionalDoc(docFiles);
  //     }
  //     const infoList = {};

  //     if (additionalInfoDetailsForBPM.length) {
  //       additionalInfoDetailsForBPM.forEach(eachDoc => {
  //         const { QueryUniqueID, QueryResponse } = eachDoc;
  //         if (!infoList[`info_${QueryUniqueID}`]) {
  //           infoList[`info_${QueryUniqueID}`] = [];
  //         }

  //         // Push the current item to the corresponding array
  //         infoList[`info_${QueryUniqueID}`].push(QueryResponse);
  //       });
  //       setAdditionalInfo(infoList);
  //     }
  //   }, []);

  const initialValues = {
    ...(additionInfo && additionInfo),
    ...(additionalDoc && additionalDoc)
  };

  const SchemaObject = useMemo(() => {
    // console.log(initialValues);
    const schema = {};
    Object.keys(initialValues).map(field => {
      //   console.log(field);
      if (field.includes("doc")) {
        schema[field] = Yup.array().of(
          Yup.mixed()
            .test("required", "Please upload the required document", file => {
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
        );
      }
      if (field.includes("info")) {
        schema[field] = Yup.string()
          .required("Field is required")
          // eslint-disable-next-line no-template-curly-in-string
          .min(25, "Minimum ${min} characters allowed")
          .max(1000, "Maximum ${max} characters allowed");
      }
    });
    // console.log(schema);
    return schema;
  }, [initialValues]);

  const additionalInfoSchema = Yup.object().shape(SchemaObject);

  const handleSubmit = (errors, props) => {
    props.handleSubmit();
    if (!Object.keys(errors).length) {
      setIsLoading(true);
      sendProspectToAPI(NEXT, null, SUBMIT).then(
        isScreeningError => {
          /* istanbul ignore else */
          if (!isScreeningError) {
            if (isAgent) {
              pushHistory(routes.searchProspect, true);
            } else {
              pushHistory(routes.MyApplications, true);
            }
          }
        },
        () => setIsLoading(false)
      );
    }
  };

  return additionalDoc ? (
    <Formik
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
      validationSchema={additionalInfoSchema}
    >
      {({ touched, setTouched, setFieldValue, values, isValid, errors, ...props }) => {
        // console.log(errors);
        return (
          <Form>
            <OverlayLoader open={loading} text={"Please Wait"} />
            <div className={classes.heading}>Additional information</div>
            <div className={classes.additionalInformationWrapper}>
              <div className={classes.companyNameinfoContainer}>
                <StakeholdersDetail name={stakeholderName} isStakeholder={false} />
              </div>
              {additionalInfoDetailsFromBPM && (
                <span className={classes.informationType}>Required information</span>
              )}
              <AdditionalQuery
                additionalInfoDetailsFromBPM={additionalInfoDetailsFromBPM}
                setFieldValue={setFieldValue}
                errors={errors}
              />
              {additionalDocumentDetailsFromBPM && (
                <span className={classes.informationType}>Required Document(s)</span>
              )}
              <AdditionalDocument
                additionalDocumentDetailsFromBPM={additionalDocumentDetailsFromBPM}
                additionalDocumentDetailsForBPM={additionalDocumentDetailsForBPM}
                setFieldValue={setFieldValue}
                values={values}
                touched={touched}
                setTouched={setTouched}
              />
              <Footer>
                <BackLink
                  path={isAgent ? routes.searchProspect : routes.comeBackLogin}
                  isTypeButton={true}
                />
                <NextStepButton
                  justify="flex-end"
                  display="block"
                  label="Submit"
                  onClick={() => handleSubmit(errors, props)}
                />
              </Footer>
            </div>
          </Form>
        );
      }}
    </Formik>
  ) : (
    <></>
  );
}
