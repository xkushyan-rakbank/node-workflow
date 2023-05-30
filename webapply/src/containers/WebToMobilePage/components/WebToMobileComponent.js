import React from "react";
import { OverlayLoader } from "../../../components/Loader";

export const WebToMobileComponent = ({ loading }) => {
  return <OverlayLoader text={"Authenticating..."} open={loading} />;
};
