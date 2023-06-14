/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { useSelector } from "react-redux";
import {
  getAccountType,
  getCompanyName,
  getDatalist,
  getIsIslamicBanking,
  getSignatories
} from "../../../../store/selectors/appConfig";
import { wcmClient } from "../../../../api/axiosConfig";
import { log } from "../../../../utils/loggger";

const accountTypeMap = {
  "Current Account": "KFSDynamicDataForPrint_CurrentAccount",
  RAKStarter: "KFSDynamicDataForPrint_RAKStarter",
  RAKelite: "KFSDynamicDataForPrint_RAKElite"
};

const CONVENTIONAL = "CONV";
const ISLAMIC = "ISLA";
const DATE = "KDAT";
const COMPANY_NAME = "CNME";
const SIGNATORY = "SIGN";
const FONT_SIZE = 9;

export default function useGeneratePdf(path = "kfsUrl", wcmData = null, enableEdit = false) {
  const [editedFile, setEditedFile] = useState(null);
  const [pdfLink, setPdfLink] = useState();
  const [height, setHeight] = useState();
  const [pages, setPages] = useState();
  const signatoryInfo = useSelector(getSignatories);
  const organizationInfo = useSelector(getCompanyName);
  const dataList = useSelector(getDatalist);
  const accountType = useSelector(getAccountType);
  const isIslamic = useSelector(getIsIslamicBanking);

  const getCoordinates = useCallback(() => {
    if (!dataList[accountTypeMap[accountType]]) {
      return null;
    }
    const selectedAccountTypeData = dataList[accountTypeMap[accountType]].find(eachData => {
      if (isIslamic) {
        return eachData.code === ISLAMIC;
      } else {
        return eachData.code === CONVENTIONAL;
      }
    });

    const corrdinateDetails = {};
    selectedAccountTypeData.subGroup.forEach(element => {
      switch (element.code) {
        case DATE:
          corrdinateDetails[DATE] = JSON.parse(element.displayText);

          break;
        case COMPANY_NAME:
          corrdinateDetails[COMPANY_NAME] = JSON.parse(element.displayText);

          break;
        case SIGNATORY:
          corrdinateDetails[SIGNATORY] = JSON.parse(element.displayText);
          break;
        default:
          break;
      }
    });

    return {
      pageNumber: JSON.parse(selectedAccountTypeData.displayText).pageNumber,
      ...corrdinateDetails
    };
  }, [dataList]);

  useEffect(() => {
    if (!pdfLink) {
      return;
    }
    const soleSignatory = signatoryInfo[0]?.editedFullName;
    const today = new Date(Date.now());
    const generatePdfPreview = async () => {
      const existingPdfBytes = await wcmClient
        .request({
          url: pdfLink,
          method: "GET",
          responseType: "arraybuffer"
        })
        .then(respose => respose.data)
        .catch(error => {
          log(error);
        });
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      setPages(pages);
      let thePage = pages[0];
      if (enableEdit) {
        const coordinates = getCoordinates();
        const pageNumberToSample = coordinates.pageNumber;
        thePage = pages[pageNumberToSample];
        thePage.drawText(soleSignatory, {
          size: FONT_SIZE,
          ...coordinates[SIGNATORY]
        });

        thePage.drawText(today.toLocaleDateString("en-GB"), {
          size: FONT_SIZE,
          ...coordinates[DATE]
        });

        thePage.drawText(organizationInfo, {
          size: FONT_SIZE,
          ...coordinates[COMPANY_NAME]
        });
      }
      const { height } = thePage.getSize();
      setHeight(height * pages.length);
      const pdfBytes = await pdfDoc.save();
      const file = new Blob([pdfBytes], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const url = fileURL;
      setEditedFile(url);
    };

    generatePdfPreview();
  }, [pdfLink]);

  const getTermsandConditions = async () => {
    const wcmAPIPath = process.env.REACT_APP_WCM_API_PATH;
    setPdfLink(wcmData.productVariantContent[0][`${path}`].split(wcmAPIPath)[1]);
  };

  useEffect(() => {
    if (!wcmData) {
      return;
    }
    getTermsandConditions();
  }, [wcmData, path]);

  return { editedFile, height, pages };
}
