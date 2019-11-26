import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  squareInput: {
    marginRight: "20px",
    marginTop: "48px",
    marginBottom: "40px",
    "& fieldset": {
      borderRadius: "8px ",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#373737"
    },
    "& div": {
      borderRadius: 8,
      width: "110px",
      height: "88px",
      fontSize: "46px",
      fontWeight: "600",
      "@media only screen and (max-width: 1360px)": {
        width: "100px"
      },
      "@media only screen and (max-width: 1220px)": {
        width: "85px",
        height: "70px"
      }
    },
    "& input": {
      textAlign: "center"
    }
  }
});
