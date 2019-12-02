import React from "react";
import uniqueId from "lodash/uniqueId";

import { AddButton } from "../../../components/Buttons/AddButton";

export const ArrayAddButton = ({
  arrayHelpers,
  dataArray,
  addedItem,
  limit,
  requiredFields,
  ...props
}) => {
  const checkIsAddButtonDisabled = () => {
    if (!dataArray.length) {
      return false;
    }
    const lastAddedItem = dataArray[dataArray.length - 1];
    return dataArray.length === limit || requiredFields.some(item => lastAddedItem[item] === "");
  };

  return (
    <AddButton
      onClick={() => arrayHelpers.insert(dataArray.length, { ...addedItem, id: uniqueId() })}
      disabled={checkIsAddButtonDisabled()}
      {...props}
    />
  );
};
