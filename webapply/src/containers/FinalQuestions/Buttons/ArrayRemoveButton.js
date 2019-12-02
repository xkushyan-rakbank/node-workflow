import React from "react";
import { connect } from "react-redux";
import { updateProspect } from "../../../store/actions/appConfig";
import { RemoveButton } from "../../../components/Buttons/RemoveButton";

const ArrayRemoveButtonComponent = ({
  arrayHelpers,
  dataArray,
  itemIndex,
  prospectPath,
  updateProspect,
  ...props
}) => {
  return (
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
};

const mapDispatchToProps = {
  updateProspect
};

export const ArrayRemoveButton = connect(
  null,
  mapDispatchToProps
)(ArrayRemoveButtonComponent);
