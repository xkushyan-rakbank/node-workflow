import React from "react";
import cx from "classnames";
import FormGroup from "@material-ui/core/FormGroup";
import TextInput from "./TextInput";
import PureSelect from "./PureSelect";
import { withStyles } from "@material-ui/core/styles";

const style = {
  selectField: {
    "& svg": {
      fontSize: " 18px",
      color: " #000",
      top: " 50%",
      transform: " translate(0, -50%)"
    }
  },
  selectFieldCombined: {
    width: "90px !important",
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)"
    },
    "& svg": {
      right: "10px"
    }
  }
};

const CombinedSelect = props => {
  const { selectId, inputId, classes } = props;
  return (
    <FormGroup className="selectCombined">
      <PureSelect
        id={
          selectId
        } /*className={cx(classes.selectField, classes.selectFieldCombined)}*/
      />
      <TextInput id={inputId} />
    </FormGroup>
  );
};

export default withStyles(style)(CombinedSelect);
