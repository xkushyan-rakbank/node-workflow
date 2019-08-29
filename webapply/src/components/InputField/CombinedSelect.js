import React from "react";
import cx from "classnames";
import FormGroup from "@material-ui/core/FormGroup";
import TextInput from "./TextInput";
import PureSelect from "./PureSelect";
import { withStyles } from "@material-ui/core/styles";

const style = {
  selectCombined: {
    flexDirection: "row !important",
    alignItems: "baseline",
    margin: "12px 0 24px !important",
    "& label": {
      maxWidth: "unset"
    },
    "& > div": {
      margin: "0 !important",
      "&:first-child": {
        "& fieldset": {
          borderRight: 0,
          borderTopRightRadius: " 0 !important",
          borderBottomRightRadius: " 0 !important",
          borderTopLeftRadius: " 8px !important",
          borderBottomLeftRadius: " 8px !important"
        }
      },
      "&:last-child": {
        flex: "1",
        "& fieldset": {
          borderTopLeftRadius: "0 !important",
          borderBottomLeftRadius: "0 !important"
        }
      }
    }
  }
};

const CombinedSelect = props => {
  const { selectId, inputId, classes } = props;
  return (
    <FormGroup className={classes.selectCombined}>
      <PureSelect id={selectId} combinedSelect />
      <TextInput id={inputId} />
    </FormGroup>
  );
};

export default withStyles(style)(CombinedSelect);
