import get from "lodash/get";
import { accountsNames } from "./index";

import { store } from "../store";

/* Conventional*/
import transactionConventional from "../assets/icons/conventional/transaction.png";
import availabilityConventional from "../assets/icons/conventional/availability.png";
import balanceConventional from "../assets/icons/conventional/balance.png";
import managerConventional from "../assets/icons/conventional/manager.png";
import plusConventional from "../assets/icons/conventional/rak-value-plus.png";
import maxConventional from "../assets/icons/conventional/rak-value-max.png";
import interrogationConventional from "../assets/icons/conventional/interrogation.png";
import signatureConventional from "../assets/icons/conventional/signature.png";
import licenseConventional from "../assets/icons/conventional/trade-license.png";
import passportConventional from "../assets/icons/conventional/passport-visa.png";
import emiratesIdConventional from "../assets/icons/conventional/emirates-id.png";
import companyDocumentsConventional from "../assets/icons/conventional/company-documents.png";
import bankingConventional from "../assets/icons/conventional/banking.png";
import logoConventional from "../assets/images/rakbankLogo.png";

/* RAKIslamic */
import balanceIslamic from "../assets/icons/islamic/balance.png";
import availabilityIslamic from "../assets/icons/islamic/availability.png";
import processingIslamic from "../assets/icons/islamic/processing.png";
import transactionIslamic from "../assets/icons/islamic/transaction.png";
import managerIslamic from "../assets/icons/islamic/manager.png";
import withdrawalIslamic from "../assets/icons/islamic/withdrawal.png";
import serviceCenterIslamic from "../assets/icons/islamic/serviceCenter.png";
import exchangeIslamic from "../assets/icons/islamic/exchange.png";
import plusIslamic from "../assets/icons/islamic/rak-value-plus.png";
import maxIslamic from "../assets/icons/islamic/rak-value-max.png";
import loungeIslamic from "../assets/icons/islamic/lounge.png";
import interrogationIslamic from "../assets/icons/islamic/interrogation.png";
import signatureIslamic from "../assets/icons/islamic/signature.png";
import licenseIslamic from "../assets/icons/islamic/trade-license.png";
import passportIslamic from "../assets/icons/islamic/passport-visa.png";
import emiratesIdIslamic from "../assets/icons/islamic/emirates-id.png";
import companyDocumentsIslamic from "../assets/icons/islamic/company-documents.png";
import bankingIslamic from "../assets/icons/islamic/banking.png";
import logoIslamic from "../assets/images/rakbankLogoIslamic.png";

/* RAKElite */
import processingEliteIc from "../assets/icons/elite/processing.png";
import withdrawalElite from "../assets/icons/elite/withdrawal.png";
import managerElite from "../assets/icons/elite/manager.png";
import serviceCenterElite from "../assets/icons/elite/serviceCenter.png";
import exchangeElite from "../assets/icons/elite/exchange.png";
import plusElite from "../assets/icons/elite/rak-value-plus.png";
import maxElite from "../assets/icons/elite/rak-value-max.png";
import loungeElite from "../assets/icons/elite/lounge.png";
import interrogationElite from "../assets/icons/elite/interrogation.png";
import signatureElite from "../assets/icons/elite/signature.png";
import licenseElite from "../assets/icons/elite/trade-license.png";
import passportElite from "../assets/icons/elite/passport-visa.png";
import emiratesIdElite from "../assets/icons/elite/emirates-id.png";
import companyDocumentsElite from "../assets/icons/elite/company-documents.png";
import bankingElite from "../assets/icons/elite/banking.png";
import logoElite from "../assets/images/rakbankLogoElite.png";

/* Conventional*/
const conventionalIconsSet = {
  availability: availabilityConventional,
  balance: balanceConventional,
  transaction: transactionConventional,
  manager: managerConventional,
  plus: plusConventional,
  max: maxConventional,
  interrogation: interrogationConventional,
  signature: signatureConventional,
  license: licenseConventional,
  passport: passportConventional,
  emiratesId: emiratesIdConventional,
  companyDocuments: companyDocumentsConventional,
  banking: bankingConventional,
  logo: logoConventional
};

/* RAKIslamic */
const islamicIconsSet = {
  availability: availabilityIslamic,
  balance: balanceIslamic,
  processing: processingIslamic,
  transaction: transactionIslamic,
  manager: managerIslamic,
  withdrawal: withdrawalIslamic,
  serviceCenter: serviceCenterIslamic,
  exchange: exchangeIslamic,
  plus: plusIslamic,
  max: maxIslamic,
  lounge: loungeIslamic,
  interrogation: interrogationIslamic,
  signature: signatureIslamic,
  license: licenseIslamic,
  passport: passportIslamic,
  emiratesId: emiratesIdIslamic,
  companyDocuments: companyDocumentsIslamic,
  banking: bankingIslamic,
  logo: logoIslamic
};

/* RAKElite */
const eliteIconsSet = {
  balance: balanceIslamic,
  processing: processingEliteIc,
  withdrawal: withdrawalElite,
  manager: managerElite,
  serviceCenter: serviceCenterElite,
  exchange: exchangeElite,
  lounge: loungeElite,
  plus: plusElite,
  max: maxElite,
  interrogation: interrogationElite,
  signature: signatureElite,
  license: licenseElite,
  passport: passportElite,
  emiratesId: emiratesIdElite,
  companyDocuments: companyDocumentsElite,
  banking: bankingElite,
  logo: logoElite
};

export const getIconsByAccount = () => {
  const islamicBanking = get(store.getState(), "appConfig.prospect.applicationInfo.islamicBanking");
  const accountType = get(store.getState(), "appConfig.prospect.applicationInfo.accountType");

  if (islamicBanking && accountType !== accountsNames.elite) {
    return islamicIconsSet;
  }
  if (
    accountType === accountsNames.starter ||
    accountType === accountsNames.currentAccount ||
    accountType === ""
  ) {
    return conventionalIconsSet;
  } else {
    return eliteIconsSet;
  }
};
