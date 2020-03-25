import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  centeredContainer: {
    marginTop: 0
  },
  container: {
    "& .title": {
      marginBottom: "0",
      fontSize: "48px"
    }
  },
  title: {
    fontSize: "20px"
  }
});
