import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  squareInput: {
    borderRadius: 8,
    marginRight: "20px",
    "& div": {
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
