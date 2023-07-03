import React, { useCallback } from "react";
import { Field } from "formik";

import { Upload } from "../../../../components/Upload";
import {
  MOA_ACCEPTED_FILE_TYPES,
  MOA_FILE_SIZE,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../../constants";

export const DocumentUpload = ({ values, setFieldValue }) => {
  const handleDropFile = useCallback((acceptedFiles, name) => {
    let file = acceptedFiles[0];
    if (file) {
      setFieldValue(
        name,
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
    }
  }, []);

  return (
    <>
      <Field
        name="tradeLicenseOrCOI"
        path="prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI"
        type="file"
        fieldDescription="Trade licence/Certificate of Incorporation"
        helperText={"Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"}
        accept={TL_ACCEPTED_FILE_TYPES}
        fileSize={TL_COI_FILE_SIZE}
        onDrop={acceptedFile => handleDropFile(acceptedFile, "tradeLicenseOrCOI")}
        file={values.tradeLicenseOrCOI}
        onDelete={() => setFieldValue("tradeLicenseOrCOI", "")}
        component={Upload}
        content={values?.tradeLicenseOrCOI?.name}
      />
      <div style={{ marginTop: "21px" }}>
        <Field
          name="moa"
          path="prospect.prospectDocuments.companyDocument.moa"
          fieldDescription="Memorandum of Association / Articles of Association / Partners Agreement / Service Agreement / Share Certificate"
          helperText={"Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"}
          type="file"
          accept={MOA_ACCEPTED_FILE_TYPES}
          fileSize={MOA_FILE_SIZE}
          onDrop={acceptedFile => handleDropFile(acceptedFile, "moa")}
          file={values.moa}
          onDelete={() => setFieldValue("moa", "")}
          component={Upload}
          content={values?.moa?.name}
        />
      </div>
    </>
  );
};

export default DocumentUpload;
