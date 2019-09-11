import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  wrapper: {
    borderRadius: "16.5px",
    backgroundColor: "#eff2f4",
    marginLeft: "auto",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    width: "109px",
    height: "32px",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "400",
    color: "#373737"
  },
  spinner: {
    marginRight: "8px"
  }
};

const StatusLoader = props => {
  const { loading = true } = props;
  const loadingProcess = (
    <>
      <CircularProgress
        size="16px"
        className={props.classes.spinner}
        thickness={5}
      />
      Saving...
    </>
  );
  return (
    <div className={props.classes.wrapper}>
      {loading ? loadingProcess : "Saved"}
    </div>
  );
};

export default withStyles(styles)(StatusLoader);
