import React from "react";

import { RemoveButton } from "../../../../components/Buttons/RemoveButton";

export const ArrayRemoveButton = ({
  arrayHelpers,
  dataArray,
  itemIndex,
  prospectPath,
  updateProspect,
  ...props
}) => (
  <RemoveButton
    onClick={() => {
      arrayHelpers.remove(itemIndex);
      updateProspect({
        [prospectPath]: [...dataArray].splice(itemIndex, 1)
      });
    }}
    {...props}
  />
);
