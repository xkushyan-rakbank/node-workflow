import { makeStyles } from "@material-ui/core/styles";

import { mobileResolution } from "../../../../constants";

export const useStyles = makeStyles({
  answers: {
    marginTop: "40px",
    borderRadius: "8px",
    overflow: "auto",
    "@media only screen and (max-width: 991px)": {
      overflow: "inherit"
    }
  },
  title: {
    minWidth: "500px",
    padding: "18px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "rgba(239, 242, 244, .5)",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minWidth: "auto",
      padding: "20px 16px",
      borderRadius: "8px 8px 0 0"
    }
  },
  cardsWrapper: {
    padding: "30px 0 10px 0"
  },
  iconsWrapper: {
    flexWrap: "nowrap",
    margin: "0 -10px",
    "@media only screen and (max-width: 991px)": {
      flexWrap: "wrap"
    }
  }
});
