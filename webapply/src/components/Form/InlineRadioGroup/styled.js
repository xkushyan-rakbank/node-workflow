import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    width: "100%"
  },
  inlineFormControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexWrap: "nowrap",
    margin: "10px 0",
    "& > .box-group-grid": {
      marginLeft: "40px"
    }
  },
  inlineFormRadioWrapper: {
    display: "flex",
    flexShrink: 0
  },
  label: {
    marginRight: "42px"
  }
});
