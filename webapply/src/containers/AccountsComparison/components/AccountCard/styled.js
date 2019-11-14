import { portraitOrientationQueryIPads } from "../../../../constants/styles";

const styled = {
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
};

export default styled;
