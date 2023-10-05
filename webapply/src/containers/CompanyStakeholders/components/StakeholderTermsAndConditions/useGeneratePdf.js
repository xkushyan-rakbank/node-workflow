/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { PDFDocument, StandardFonts, breakTextIntoLines } from "pdf-lib";
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
  kfsUrl: {
    "Current Account": "KFSDynamicDataForPrint_CurrentAccount",
    RAKStarter: "KFSDynamicDataForPrint_RAKStarter",
    RAKelite: "KFSDynamicDataForPrint_RAKElite"
  },
  authorizationsConsent_Others: {
    "Current Account": "Consent_Others",
    RAKStarter: "Consent_Others",
    RAKelite: "Consent_Others"
  },
  generalTermsAndConditions: {
    "Current Account": "KFSDynamicDataForPrint_CurrentAccount",
    RAKStarter: "KFSDynamicDataForPrint_RAKStarter",
    RAKelite: "KFSDynamicDataForPrint_RAKElite"
  }
};

const consentApplicantMap = {
  "Current Account": "Consent_NameOfApplicant",
  RAKStarter: "Consent_NameOfApplicant",
  RAKelite: "Consent_NameOfApplicant"
};

const CONVENTIONAL = "CONV";
const ISLAMIC = "ISLA";
const DATE = "KDAT";
const COMPANY_NAME = "CNME";
const SIGNATORY = "SIGN";
const FONT_SIZE = 9;
const APPLICANT_NAME = "APPL";

export default function useGeneratePdf(path = "kfsUrl", wcmData = null, enableEdit = false) {
  const [editedFile, setEditedFile] = useState(null);
  const [pdfLink, setPdfLink] = useState();
  const [height, setHeight] = useState();
  const [pages, setPages] = useState();
  const [cpfDocModificationInfo, setCPFDocModificationInfo] = useState([]);
  const signatoryInfo = useSelector(getSignatories);
  const organizationInfo = useSelector(getCompanyName);
  const dataList = useSelector(getDatalist);
  const accountType = useSelector(getAccountType);
  const isIslamic = useSelector(getIsIslamicBanking);

  const accountTypeData =
    accountTypeMap[
      Object.keys(accountTypeMap).filter(key => {
        return key.includes(path);
      })
    ];

  const getCoordinates = useCallback(() => {
    if (!dataList[accountTypeData[accountType]]) {
      return null;
    }
    const selectedAccountTypeData = dataList[accountTypeData[accountType]].find(eachData => {
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

  const getConsentApplicantCoordinates = useCallback(() => {
    if (!dataList[consentApplicantMap[accountType]]) {
      return null;
    }
    const selectedAccountTypeData = dataList[consentApplicantMap[accountType]].find(eachData => {
      if (isIslamic) {
        return eachData.code === ISLAMIC;
      } else {
        return eachData.code === CONVENTIONAL;
      }
    });

    const corrdinateDetails = {};
    selectedAccountTypeData.subGroup.forEach(element => {
      switch (element.code) {
        case APPLICANT_NAME:
          corrdinateDetails[APPLICANT_NAME] = JSON.parse(element.displayText);
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
      const { width, height } = thePage.getSize();
      if (enableEdit) {
        const docModificationInfo = [];
        const coordinates = getCoordinates();
        const pageNumberToSample = coordinates.pageNumber;
        thePage = pages[pageNumberToSample];

        const drawText = async (text, page, { x, y }) => {
          const drawTxtMaxWidth = width - 90;
          const tnrFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

          const textWidth = t => tnrFont.widthOfTextAtSize(t, FONT_SIZE);
          const lines = breakTextIntoLines(text, [" "], drawTxtMaxWidth, textWidth);

          const configuredY = y;
          const lineOffset = 10;

          lines.forEach((line, lineNumber) => {
            const lineY = configuredY + (lines.length - (lineNumber + 1)) * lineOffset;
            docModificationInfo.push({
              pageNumber: parseInt(pageNumberToSample) + 1,
              text: line,
              xCoordinate: x,
              yCoordinate: lineY
            });
            page.drawText(line, {
              x,
              y: lineY,
              size: FONT_SIZE,
              font: tnrFont
            });
          });
        };

        drawText(soleSignatory, thePage, { ...coordinates[SIGNATORY] });

        drawText(today.toLocaleDateString("en-GB"), thePage, { ...coordinates[DATE] });

        if (path !== "authorizationsConsent") {
          drawText(organizationInfo, thePage, { ...coordinates[COMPANY_NAME] });
        }

        if (path === "authorizationsConsent") {
          drawText(soleSignatory, thePage, { ...coordinates[COMPANY_NAME] });
          const coordinatesForApplicantName = getConsentApplicantCoordinates();
          thePage = pages[coordinatesForApplicantName.pageNumber];
          drawText(organizationInfo, thePage, { ...coordinates[APPLICANT_NAME] });
        }
        setCPFDocModificationInfo(docModificationInfo);
      }

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

  return { editedFile, height, pages, cpfDocModificationInfo };
}
