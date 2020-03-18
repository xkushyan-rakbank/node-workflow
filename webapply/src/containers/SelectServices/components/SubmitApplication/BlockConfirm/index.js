import React from "react";
import { useSelector } from "react-redux";
import { BlockConfirmComponent } from "./BlockConfirm";
import { getIsIslamicBanking } from "../../../../../store/selectors/appConfig";

export const BlockConfirm = rest => {
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  return <BlockConfirmComponent isIslamicBanking={isIslamicBanking} {...rest} />;
};
