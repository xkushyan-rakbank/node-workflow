import React from "react";

import routes from "../../routes";
import { OTPform } from "../../components/OTPform";

export const ComeBackVerification = () => <OTPform redirectRoute={routes.MyApplications} />;
