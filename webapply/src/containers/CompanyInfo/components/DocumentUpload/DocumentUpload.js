import React, { useCallback, useState } from "react";
import { Field } from "formik";
import { useDispatch } from "react-redux";

import { Upload } from "../../../../components/Upload";
import {
  MOA_ACCEPTED_FILE_TYPES,
  MOA_FILE_SIZE,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../../constants";
import { uploadDocuments } from "../../../../store/actions/uploadDocuments";

export const DocumentUpload = ({ values, setFieldValue, touched, setTouched }) => {
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const handleDropFile = useCallback((acceptedFiles, name, touched, setTouched, setFieldValue) => {
    const file = acceptedFiles[0];
    if (file) {
      let path = "";
      if (name.includes("tradeLicenseOrCOI")) {
        path = "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI";
      } else {
        path = "prospect.prospectDocuments.companyDocument.moa";
      }
      setIsUploading({ [name]: true });
      dispatch(
        uploadDocuments({
          docs: {
            [path]: file
          },
          documentSection: "companyDocuments",
          onSuccess: () => {
            let fileStore = new File([file], file.name, { type: file.type });
            fileStore.preview = URL.createObjectURL(fileStore);
            fileStore = { ...fileStore, ...{ fileName: fileStore.name, fileSize: fileStore.size } };

            setFieldValue(name, fileStore);
            setTouched({ ...touched, ...{ [name]: true } });
            setIsUploading({ [name]: false });
          },
          onFailure: () => {
            setFieldValue(name, "");
            setIsUploading({ [name]: false });
          }
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
        onDrop={acceptedFile =>
          handleDropFile(acceptedFile, "tradeLicenseOrCOI", touched, setTouched, setFieldValue)
        }
        file={values.tradeLicenseOrCOI}
        onDelete={() => setFieldValue("tradeLicenseOrCOI", "")}
        component={Upload}
        content={values?.tradeLicenseOrCOI?.fileName}
        isUploading={isUploading["tradeLicenseOrCOI"]}
        mobilecontentPlaceholder={"Upload your File"}
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
          onDrop={acceptedFile =>
            handleDropFile(acceptedFile, "moa", touched, setTouched, setFieldValue)
          }
          file={values.moa}
          onDelete={() => setFieldValue("moa", "")}
          component={Upload}
          content={values?.moa?.fileName}
          isUploading={isUploading["moa"]}
          mobilecontentPlaceholder={"Upload your File"}
        />
      </div>
    </>
  );
};

export default DocumentUpload;
