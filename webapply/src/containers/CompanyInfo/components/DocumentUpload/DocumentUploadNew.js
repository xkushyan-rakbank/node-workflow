import React, { useCallback, useState } from "react";
import { Field, FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";

import { Upload } from "../../../../components/Upload";
import {
  MOA_ACCEPTED_FILE_TYPES,
  MOA_FILE_SIZE,
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../../constants";
import { uploadDocuments } from "../../../../store/actions/uploadDocuments";
import { updateProspect } from "../../../../store/actions/appConfig";
import { useStyles } from "./styled";
import { getCompanyDocuments } from "../../../../store/selectors/appConfig";
import useDecisions from "../../../../utils/useDecisions";

export const DocumentUpload = ({ values, setFieldValue, touched, setTouched }) => {
  /* istanbul ignore next @preserve */
  const { visible: moaVisible } = useDecisions("prospect.prospectDocuments.companyDocument.moa");
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  /* istanbul ignore next @preserve */
  const companyDocuments = useSelector(getCompanyDocuments) || [];
  const dispatch = useDispatch();
  /* istanbul ignore next @preserve */
  const onSuccessFunction = (file, name, touched, fileDocKey) => {
    let fileStore = new File([file], file.name, { type: file.type });
    fileStore.preview = URL.createObjectURL(fileStore);
    fileStore = {
      ...fileStore,
      ...{ fileName: fileStore.name, fileSize: fileStore.size, documentKey: fileDocKey }
    };
    setFieldValue(name, fileStore);
    setTouched({ ...touched, ...{ [name]: true } });
    setIsUploading({ [name]: false });
  };

  const handleDropFile = useCallback(
    (acceptedFiles, name, touched, setTouched, setFieldValue, index) => {
      /* istanbul ignore next @preserve */
      const file = acceptedFiles[0] || acceptedFiles?.dataTransfer[0];
      /* istanbul ignore next @preserve */
      if (file) {
        let path = "";
        let fileDocKey = "";
        if (name.includes("tradeLicenseOrCOI")) {
          path = fileDocKey = "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI";
        } else {
          path = "prospect.prospectDocuments.companyDocument.moa";
          fileDocKey = `prospect.prospectDocuments.companyDocument.moa-${index}`;
        }
        setIsUploading({ [name]: true });
        dispatch(
          uploadDocuments({
            docs: {
              [path]: file
            },
            documentSection: "companyDocuments",
            onSuccess: () => {
              /* istanbul ignore next @preserve */
              onSuccessFunction(file, name, touched, fileDocKey);
            },
            /* istanbul ignore next @preserve */
            onFailure: () => {
              /* istanbul ignore next @preserve */
              setFieldValue(name, "");
              /* istanbul ignore next @preserve */
              setIsUploading({ [name]: false });
            },
            index
          })
        );
      }
    },
    []
  );

  const uploadDescription = (
    <div style={{ fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#757575" }}>
      <p>Make sure your Trade License or certificate is clear and legible.</p>
    </div>
  );

  const addMOADocument = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, "");
  };

  const removeDocument = (indexToRemove, values, name, item, length, setFieldValue) => {
    const isMinLength = length === 1;
    /* istanbul ignore next @preserve */
    if (setFieldValue) {
      let field = indexToRemove >= 0 ? `${name}[${indexToRemove}]` : name;
      setFieldValue(field, "");
    } else {
      isMinLength && setFieldValue(name, [""]);
      values[name].splice(indexToRemove, 1);
    }

    /* istanbul ignore next @preserve */
    const updatedOtherDocuments = companyDocuments.filter(eachDoc => {
      if (name === "tradeLicenseOrCOI") {
        return (
          eachDoc.documentKey !== "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI"
        );
      }
      return eachDoc.documentKey !== item.documentKey;
    });
    dispatch(
      updateProspect({
        "prospect.documents.companyDocuments": updatedOtherDocuments
      })
    );
  };

  return (
    <div data-testid="DocumentUploadSection">
      <Field
        name="tradeLicenseOrCOI"
        path="prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI"
        type="file"
        fieldDescription="Trade License/Certificate of Incorporation"
        helperText={SUPPORTED_FILE_FORMAT_TEXT}
        accept={TL_ACCEPTED_FILE_TYPES}
        fileSize={TL_COI_FILE_SIZE}
        onDrop={acceptedFile =>
          handleDropFile(
            acceptedFile,
            "tradeLicenseOrCOI",
            touched,
            setTouched,
            setFieldValue,
            undefined
          )
        }
        file={values.tradeLicenseOrCOI?.fileName}
        onDelete={() => {
          setTouched({ ...touched, ...{ tradeLicenseOrCOI: true } });
          removeDocument(
            undefined,
            values,
            "tradeLicenseOrCOI",
            values.tradeLicenseOrCOI,
            values.tradeLicenseOrCOI?.length,
            setFieldValue
          );
        }}
        component={Upload}
        content={values?.tradeLicenseOrCOI}
        isUploading={isUploading["tradeLicenseOrCOI"]}
        mobilecontentPlaceholder={"Upload your file"}
        notedText={uploadDescription}
        dataTestId="tradeLicenseOrCOIUploadField"
      />
      {moaVisible && (
        <>
          <FieldArray
            name="moa"
            path="prospect.prospectDocuments.companyDocument.moa"
            render={arrayHelpers => {
              return (
                <>
                  {values?.moa?.map((item, index) => {
                    return (
                      <div key={index} style={{ marginTop: "21px" }} data-testid="moaWrapperDiv">
                        <Field
                          name={`moa[${index}]`}
                          path={`prospect.prospectDocuments.companyDocument.moa[${index}]`}
                          type="file"
                          fieldDescription="Memorandum of Association / Articles of Association / Partners Agreement / Service Agreement / Share Certificate"
                          helperText={SUPPORTED_FILE_FORMAT_TEXT}
                          accept={MOA_ACCEPTED_FILE_TYPES}
                          fileSize={MOA_FILE_SIZE}
                          onDrop={acceptedFile =>
                            handleDropFile(
                              acceptedFile,
                              `moa[${index}]`,
                              touched,
                              setTouched,
                              setFieldValue,
                              index
                            )
                          }
                          file={values.moa[index]?.fileName}
                          onDelete={() =>
                            removeDocument(
                              index,
                              values,
                              "moa",
                              values.moa[index],
                              values.moa.length,
                              setFieldValue
                            )
                          }
                          component={Upload}
                          content={values.moa[index]}
                          isUploading={isUploading[`moa[${index}]`]}
                          mobilecontentPlaceholder={"Upload your file"}
                          dataTestId="moaUploadField"
                        />
                        {values?.moa?.length > 1 && index > 0 && (
                          <div
                            style={{
                              display: "flex",
                              marginTop: "5px",
                              width: "100%",
                              justifyContent: "end"
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              style={{ padding: 0 }}
                              onClick={() =>
                                removeDocument(
                                  index,
                                  values,
                                  "moa",
                                  values.moa[index],
                                  values.moa.length
                                )
                              }
                              data-testid="removeIconButton"
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {values?.moa?.length < 5 && (
                    <Button
                      disabled={values.moa.length === 1 && !values.moa[0].fileName}
                      color="primary"
                      variant="outlined"
                      className={classes.addMoreButton}
                      onClick={() => addMOADocument(arrayHelpers, values.moa.length)}
                      data-testid="addMoreMOA"
                    >
                      + Add more
                    </Button>
                  )}
                </>
              );
            }}
          />
        </>
      )}
    </div>
  );
};

export default DocumentUpload;
