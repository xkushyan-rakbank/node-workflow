import React from "react";
import { OverlayLoader } from "../../../components/Loader";

export const Loader = ({ loading }) => {
  return <OverlayLoader text={"Please wait..."} open={loading} />;
};
