export const LIST_VIEW = "list";

export const GRID_VIEW = "grid";
export const RO_LABEL = "The contact details of your sales officer";

export const notCtaStatuses = {
  Assessing: "We will call you soon",
  "Account activated": "Ready for transaction",
  Declined: "Criteria not met",
  Ineligible: "We will call you soon",
  NoStatusYet: "We will call you soon",
  Success: "Success",
  "Additional Info Required": "Additional information required",
  "Sales Agent Update": "Sales Agent Update"
};

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
  }
};

export const ctaStatusClass = {
  Assessing: "greencard",
  "Account activated": "greencard",
  Declined: "greycard",
  Success: "greencard",
  "Additional Info Required": "yellowcard",
  "Sales Agent Update": "greycard"
};
