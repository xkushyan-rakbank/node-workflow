import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  AutoSaveField as Field,
  InlineRadioGroup,
  Input,
  SelectAutocomplete
} from "../../../components/Form";
import { YesNaList, YesNoNaList } from "../../../constants/options";
import {
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../constants";
import { Upload } from "../../../components/Upload";
import { useStyles } from "../styled";
import { ErrorInfo } from "../../../components/InfoNote/ErrorInfo";
import { uploadDocuments } from "../../../store/actions/uploadDocuments";
import { EXPERIENCE_BUSINESS_MODAL_LENGTH } from "../../SelectServices/constants";
import { updateProspect } from "../../../store/actions/appConfig";
import { getDocuments, getSignatories } from "../../../store/selectors/appConfig";
import { VerificationDetailsList } from "./VerificationDetailsList";
import { VisitDetailsList } from "./VisitDetailsList";
import { getLoginResponse } from "../../../store/selectors/loginSelector";

export const KycAnnexureDetails = ({ values, setFieldValue, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const kycAnnexureDocuments = useSelector(getDocuments).kycAnnexureDocuments;
  const signatoryNameData = useSelector(getSignatories)[0]?.editedFullName;
  const { agentName } = useSelector(getLoginResponse);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    setFieldValue("roName", agentName || "");
    setFieldValue("signatoryName", signatoryNameData || "");
  }, []);

  const removeDoc = (indexToRemove, values, name, item, length, setFieldValue) => {
    const isMinLength = length === 1;
    if (setFieldValue) {
      setFieldValue(name, "");
    } else {
      isMinLength && setFieldValue(name, [""]);
      values[name].splice(indexToRemove, 1);
    }

    const updatedOtherDocuments = kycAnnexureDocuments.filter(eachDoc => {
      if (name === "signatoryEIDinfoReport") {
        return eachDoc.documentKey !== name;
      }
      return eachDoc.fileName !== item.documentKey;
    });

    dispatch(
      updateProspect({
        "prospect.documents.kycAnnexureDocuments": updatedOtherDocuments
      })
    );
  };

  const createKYCAnnexureRadioHandler = ({ values, setFieldValue }) => async event => {
    const value = JSON.parse(event.target.value);
    const target = event.target.name;
    setFieldValue(target, value);
  };

  const kycAnnexureRadioHandler = createKYCAnnexureRadioHandler({
    values,
    setFieldValue
  });

  const isError = useCallback(() => {
    const atleastOneError = values?.visitDetails?.length === 1 && props.errors?.visitDetails?.[0];
    const morethanOneError =
      props.errors?.visitDetails && props.errors?.visitDetails.filter(eachItem => eachItem);
    return (
      atleastOneError ||
      (morethanOneError && morethanOneError.length === values.visitDetails.length)
    );
  }, [props.errors, values]);

  const handleDropFile = useCallback(
    (acceptedFiles, name, touched, setTouched, setFieldValue, index) => {
      const file = acceptedFiles[0];
      setIsUploading(false);
      if (file) {
        let proofDoc = { ...isUploading };
        proofDoc[name || index] = true;
        setIsUploading(proofDoc);
        dispatch(
          uploadDocuments({
            docs: [file],
            otherDocuments: {
              documentType: file.type,
              documentTitle: name
            },
            documentSection: "kycAnnexureDocuments",
            onSuccess: responseName => {
              let fileStore = new File([file], file.name, { type: file.type });
              fileStore.preview = URL.createObjectURL(fileStore);
              fileStore.documentKey = responseName;
              fileStore = {
                ...fileStore,
                ...{ fileName: fileStore.name, fileSize: fileStore.size }
              };
              setFieldValue(name, fileStore);
              setTouched({ ...touched, ...{ [name]: true } });
              proofDoc[name || index] = false;
              setIsUploading(proofDoc);
            },
            onFailure: () => {
              setFieldValue(name, "");
              proofDoc[name || index] = false;
              setIsUploading(false);
            },
            index
          })
        );
      }
    },
    []
  );

  useEffect(() => {
    if (values["isVisitConducted"] !== "yes") {
      dispatch(updateProspect({ "prospect.kycAnnexure.visitDetails": null }));
      setFieldValue("visitDetails", [
        {
          kycVisitDate: "",
          kycVisitTime: "",
          visitConductedBy: "",
          visitConductedAt: "",
          noticeToCounterfeit: "",
          sisterCompanyTradeLicense: ""
        }
      ]);
    }
  }, [values["isVisitConducted"]]);

  console.log(values["isVisitConducted"], values);
  return (
    <>
      <h4 className={classes.title}>General details</h4>
      <Grid container spacing={3} className={classes.generalDetailsGrid}>
        <Grid item sm={6} xs={12}>
          <Field
            name="companyCifId"
            path={"prospect.kycAnnexure.companyCifId"}
            label="CIF number (company)"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="retailCifId"
            path={"prospect.kycAnnexure.retailCifId"}
            label="CIF number (sole proprietor)"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="workItemNumber"
            label="Workitem number"
            path={"prospect.kycAnnexure.workItemNumber"}
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="leadNumber"
            label="Lead number"
            path={"prospect.kycAnnexure.leadNumber"}
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="sourcingCode"
            label="Sourcing ID"
            path={"prospect.kycAnnexure.sourcingCode"}
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="allianceCode"
            path={"prospect.applicantInfo.allianceCode"}
            label="Partner code"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="skillBasedCategory"
            path={"prospect.kycAnnexure.skillBasedCategory"}
            label="Skill based category"
            placeholder="Skill based category"
            datalistId="skillBasedCategory"
            component={SelectAutocomplete}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="roName"
            path={"prospect.kycAnnexure.roName"}
            label="RO assigned"
            placeholder="RO assigned"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="businessModel"
            path="prospect.kycAnnexure.businessModel"
            label="Business model"
            placeholder="Business model"
            multiline
            rows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: EXPERIENCE_BUSINESS_MODAL_LENGTH }
            }}
            component={Input}
            classes={{ formControlRoot: classes.customUrlLabel, input: classes.textAreaStyle }}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="signatoryName"
            label="Name of the signatory"
            path={"prospect.kycAnnexure.signatoryName"}
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 100 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="ownerAdditionalInfo"
            path="prospect.kycAnnexure.ownerAdditionalInfo"
            label="Additional Information of owner"
            placeholder="Additional Information of owner"
            multiline
            rows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000 }
            }}
            component={Input}
            classes={{ formControlRoot: classes.customUrlLabel, input: classes.textAreaStyle }}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="generalRemarksRO"
            path="prospect.kycAnnexure.generalRemarksRO"
            label="General remarks (RO)"
            placeholder="General remarks (RO)"
            multiline
            rows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000 }
            }}
            component={Input}
            classes={{ input: classes.textAreaStyle }}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="generalRemarksRM"
            path="prospect.kycAnnexure.generalRemarksRM"
            label="General remarks (RM)"
            placeholder="General remarks (RM)"
            multiline
            rows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000 }
            }}
            component={Input}
            classes={{ formControlRoot: classes.textAreaRoot, input: classes.textAreaStyle }}
          />
        </Grid>
      </Grid>
      <div className={classes.kycSection}>
        <h4 className={classes.title}>Verification details</h4>
        <div className={classes.questionareWrapper}>
          <label className={classes.sectionLabel}>
            Is Audio/Video KYC verification / RM CPV completed for below
          </label>
          <Field
            typeRadio
            options={YesNaList}
            name="audioVideoKycVerification"
            path="prospect.kycAnnexure.audioVideoKycVerification"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={kycAnnexureRadioHandler}
          />
          <Field
            name="verificationRemarksRM"
            path="prospect.kycAnnexure.verificationRemarksRM"
            label="Remarks on verification (RM)"
            placeholder="Remarks on verification (RM)"
            multiline
            rows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000 }
            }}
            component={Input}
            classes={{
              formControlRoot: classes.rmVerificationRemarksTextarea,
              input: classes.textAreaStyle
            }}
          />
        </div>
        <VerificationDetailsList values={values} setFieldValue={setFieldValue} {...props} />
        <div className={classes.questionareWrapper}>
          <label className={classes.sectionLabel}>
            EID of the signatory pinged to EIDA and successful?
          </label>
          <Field
            typeRadio
            options={YesNaList}
            name="signatoryEIDinfo"
            path="prospect.kycAnnexure.signatoryEIDinfo"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={kycAnnexureRadioHandler}
          />
        </div>
        <Field
          name="signatoryEIDinfoReport"
          type="file"
          fieldDescription="Upload ping verification report"
          helperText={SUPPORTED_FILE_FORMAT_TEXT}
          accept={TL_ACCEPTED_FILE_TYPES}
          fileSize={TL_COI_FILE_SIZE}
          component={Upload}
          mobilecontentPlaceholder={"Upload your file"}
          onDrop={acceptedFile =>
            handleDropFile(
              acceptedFile,
              "signatoryEIDinfoReport",
              props.touched,
              props.setTouched,
              setFieldValue
            )
          }
          file={values?.signatoryEIDinfoReport}
          isUploading={isUploading["signatoryEIDinfoReport"]}
          onDelete={() => {
            removeDoc(
              "",
              values,
              "signatoryEIDinfoReport",
              values.signatoryEIDinfoReport,
              values.signatoryEIDinfoReport.length,
              setFieldValue
            );
          }}
          content={values?.signatoryEIDinfoReport}
        />
      </div>
      <div className={classes.kycSection}>
        <h4 className={classes.title}>Visit details </h4>
        <div className={classes.questionareWrapper}>
          <label className={classes.sectionLabel}>Is visit conducted?</label>
          <Field
            typeRadio
            options={YesNoNaList}
            name="isVisitConducted"
            path="prospect.kycAnnexure.isVisitConducted"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={kycAnnexureRadioHandler}
          />
        </div>
        {isError() && <ErrorInfo text={"You should add atleast one visit detail"} />}
        {values["isVisitConducted"] === "yes" && (
          <VisitDetailsList
            values={values}
            setFieldValue={setFieldValue}
            kycAnnexureRadioHandler={kycAnnexureRadioHandler}
            removeDoc={removeDoc}
            handleDropFile={handleDropFile}
            isUploading={isUploading}
            {...props}
          />
        )}
      </div>
    </>
  );
};
