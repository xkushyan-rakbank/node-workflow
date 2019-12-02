import React from "react";
import { AddButton } from "../../../components/Buttons/AddButton";

export const ArrayAddButton = ({
  arrayHelpers,
  dataArray,
  itemIndex,
  addedItem,
  title,
  limit,
  requiredFields
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
      onClick={() => arrayHelpers.insert(dataArray.length, addedItem)}
      title={title}
      disabled={checkIsAddButtonDisabled()}
    />
  );
};
