export const LIST_VIEW = "list";

export const GRID_VIEW = "grid";
export const RO_LABEL = "The contact details of your sales officer";

export const ctaStatuses = {
  Incomplete: {
    buttonText: "Finish application",
    mobileStatus: "You’re half way there! Please log in on a desktop to finish the application."
  },
  "Documents needed": {
    buttonText: "Upload Document",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  "Need Additional Information/Documents": {
    buttonText: "Upload Document",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  "Additional Info Required": {
    buttonText: "Update application",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  "EFR Pending": {
    buttonText: "Resend EFR link",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  }
};

export const ctaStatusClass = {
  DEC_STOPPED: "greycard",
  WI_SUBMITTED: "greencard",
  WI_APPROVED: "greencard",
  INFO_REQUIRED: "yellowcard",
  RO_EDIT: "greycard",
  OPE_EDIT: "greycard",
  IEL_STOPPED: "greycard",
  EFR_SUBMITTED: "yellowcard"
};

export const roActions = {
  PEN_SUBMITTED: {
    buttonText: "Finish application",
    mobileStatus: "You’re half way there! Please log in on a desktop to finish the application."
  },
  INFO_REQUIRED: {
    buttonText: "Update information",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  EFR_SUBMITTED: {
    buttonText: "Resend EFR link",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  RO_EDIT: {
    buttonText: "Finish application",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  WI_SUBMITTED: {
    buttonText: "View Details",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  DEC_STOPPED: {
    buttonText: "View Details",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  OPE_EDIT: {
    buttonText: "Update Application",
    mobileStatus: "You’re half way there! Please log in on a desktop to finish the application."
  }
};

export const custActions = {
  PEN_SUBMITTED: {
    buttonText: "Finish application",
    mobileStatus: "You’re half way there! Please log in on a desktop to finish the application."
  },
  INFO_REQUIRED: {
    buttonText: "Update information",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  },
  EFR_SUBMITTED: {
    buttonText: "Update information",
    mobileStatus: "We’re almost there! Please log in on a desktop to upload them."
  }
};
