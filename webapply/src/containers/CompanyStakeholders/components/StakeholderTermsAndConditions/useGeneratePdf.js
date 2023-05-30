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

export default function useGeneratePdf(type) {
  const [editedFile, setEditedFile] = useState(null);
  const [pdfLink, setPdfLink] = useState();
  const [height, setHeight] = useState();
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
    const coordinates = getCoordinates();
    if (!pdfLink) {
      return;
    }
    const soleSignatory = signatoryInfo[0]?.fullName;
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
      const pageNumberToSample = coordinates.pageNumber;
      const thePage = pages[pageNumberToSample];
      const { height } = thePage.getSize();
      setHeight(height * pages.length);
      thePage.drawText(soleSignatory, {
        size: FONT_SIZE,
        ...coordinates[SIGNATORY]
      });

      thePage.drawText(today.toLocaleDateString(), {
        size: FONT_SIZE,
        ...coordinates[DATE]
      });

      thePage.drawText(organizationInfo, {
        size: FONT_SIZE,
        ...coordinates[COMPANY_NAME]
      });
      const pdfBytes = await pdfDoc.saveAsBase64();
      setEditedFile(pdfBytes);
    };

    generatePdfPreview();
  }, [pdfLink]);

  const getTermsandConditions = async () => {
    const wcmAPIPath = process.env.REACT_APP_WCM_API_PATH;
    const URL = `/wcmapi/banking/products/variants?productId=201&productTypeId=${
      isIslamic ? 2 : 1
    }`;
    wcmClient
      .request({
        url: URL,
        method: "GET"
      })
      .then(respose => {
        const selectedAccountTypePdfLink = respose.data.find(
          eachType => eachType.code === accountType
        );
        setPdfLink(selectedAccountTypePdfLink.productVariantContent[0].kfsUrl.split(wcmAPIPath)[1]);
      })
      .catch(error => {
        log(error);
      });
  };

  useEffect(() => {
    switch (type) {
      case "KFS":
        getTermsandConditions();
        break;
      default:
        break;
    }
  }, []);

  return { editedFile, height };
}
