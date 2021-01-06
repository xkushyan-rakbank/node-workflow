import { ICONS } from "../../../../components/Icons";
import { ISLAMIC, CONVENTIONAL } from "../../../../constants";

export const trustMessageContent = {
  message:
    "Trust you have reviewed the details entered so far, as you will not be able to change them in the next page.",
  title: "",
  icon: ICONS.info
};

export const termsMessageContent = {
  message:
    "It is important to read the terms and conditions as well as terms of enrollment before you proceed.",
  title: "",
  icon: ICONS.info
};

export let submitApplication = {
  termCondition: "terms & conditions",
  termsOfEnrolment: "terms of enrolment",
  termConditionLinks: {
    [CONVENTIONAL]:
      "https://revamp.rakbank.ae/wps/wcm/connect/3f9d99b1-d7a2-4634-82b5-08f03e734295/%28A%29+J00781+RAK++Debit+Card+-+Bisiness+A4-T%26C-New+Guide-EN%26AR%28withe+out+c....pdf?MOD=AJPERES&CVID=lTLVCHV",
    [ISLAMIC]:
      "https://revamp.rakbank.ae/wps/wcm/connect/32cb9ff6-706a-489b-98fb-55d639b97c16/%28K%29+J00203+-+Debit+Card+T%26C+Business+A4+02.04.17.pdf?MOD=AJPERES&CVID=IQ7xQCk"
  },
  termEnrollmentLinks: {
    [CONVENTIONAL]:
      "https://revamp.rakbank.ae/wps/wcm/connect/b0cd7557-1926-43d7-873e-d43942313ca8/TOE+-+Conventional.pdf?MOD=AJPERES",
    [ISLAMIC]:
      "https://revamp.rakbank.ae/wps/wcm/connect/c0c9bd08-64c1-40da-af38-179f287c1c59/TOE+-+Islamic.pdf?MOD=AJPERES"
  },
  formTitle: "Submit application",
  formInfo:
    "And just like that, we have reached the end! Here’s the overview of what you’re applying for."
};

if (process.env.REACT_APP_SERVER_ENV === "production") {
  submitApplication.termConditionLinks = {
    [CONVENTIONAL]:
      "https://rakbank.ae/wps/wcm/connect/3f9d99b1-d7a2-4634-82b5-08f03e734295/%28A%29+J00781+RAK++Debit+Card+-+Bisiness+A4-T%26C-New+Guide-EN%26AR%28withe+out+c....pdf?MOD=AJPERES&CVID=lTLVCHV",
    [ISLAMIC]:
      "https://rakbank.ae/wps/wcm/connect/32cb9ff6-706a-489b-98fb-55d639b97c16/%28K%29+J00203+-+Debit+Card+T%26C+Business+A4+02.04.17.pdf?MOD=AJPERES&CVID=IQ7xQCk"
  };
  submitApplication.termEnrollmentLinks = {
    [CONVENTIONAL]:
      "https://rakbank.ae/wps/wcm/connect/b0cd7557-1926-43d7-873e-d43942313ca8/TOE+-+Conventional.pdf?MOD=AJPERES",
    [ISLAMIC]:
      "https://rakbank.ae/wps/wcm/connect/c0c9bd08-64c1-40da-af38-179f287c1c59/TOE+-+Islamic.pdf?MOD=AJPERES"
  };
}

export const NONE_VISITED = 0;
export const IS_TERMS_CONDITION_VISITED = 1;
export const IS_TERMS_ENROLLMENT_VISITED = 2;
export const IS_ALL_LINKS_VISITED = 3;
export const MAX_PROMO_CODE_LENGTH = 50;
