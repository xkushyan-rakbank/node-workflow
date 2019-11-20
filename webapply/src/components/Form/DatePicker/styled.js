import { styled } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

export const BaseDatePicker = styled(KeyboardDatePicker)({
  position: "relative",
  "&::after": {
    content: "''",
    display: "block",
    position: "absolute",
    width: "1px",
    height: "100%",
    backgroundColor: "#ddd",
    right: "56px",
    zIndex: "-1"
  },
  "& fieldset": {
    borderRadius: "8px !important",
    border: "solid 1px rgba(194, 194, 194, 0.56)"
  },
  "& svg": {
    fill: "#373737",
    fontSize: "16px"
  },
  "& button": {
    left: "4px",
    outline: "none"
  }
});
