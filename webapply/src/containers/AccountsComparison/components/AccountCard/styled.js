import { makeStyles } from "@material-ui/core/styles";

import { portraitOrientationQueryIPads } from "../../../../constants/styles";

export const useStyles = makeStyles({
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    marginTop: 20,
    overflow: "auto",
    paddingBottom: "20px",
    marginBottom: "-20px",
    [portraitOrientationQueryIPads]: {
      flexDirection: "column"
    }
  }
});
