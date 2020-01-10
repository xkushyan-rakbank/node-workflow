import callbackRegular from "./../../assets/gif/callback_regular.gif";
import declinedRegular from "./../../assets/gif/declined_regular.gif";
export const APP_STOP_SCREEN_RESULT = "stop";

export const screeningStatus = {
  dedupe: {
    icon: callbackRegular,
    text:
      "It looks like we already know you and have your details! Let us save you time. We will call you back within X days to meet you in person and help you out."
  },
  virtualCurrencies: {
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  notEligible: {
    icon: declinedRegular,
    text:
      "Oops, this product is not for you. Our RAKstarter account is for companies operating for less than a year. But don’t worry, we have other products suited for you.",
    link: true
  },
  notRegisteredInUAE: {
    icon: declinedRegular,
    text:
      "It looks like your company is not registered in the UAE. But no worries! Let’s have someone call you back within X days to meet you in person and help you out."
  },
  bigCompany: {
    icon: callbackRegular,
    text:
      "Wow, you’re a big company!\n" +
      "Let us save you time and have someone call you within X days to meet you in person and help you out."
  },
  blackList: {
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product as the details provided don’t meet out requirements. Thank you for your interest in RAKBANK."
  },
  default: {
    icon: declinedRegular,
    text:
      "We apologise that we are unable to offer you a product. Thank you for your interest in RAKBANK"
  }
};
