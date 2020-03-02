import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3b3a3a"
    },
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)"
    },
    "& .Mui-focused fieldset": {
      borderColor: "#373737 !important"
    }
  }
});
