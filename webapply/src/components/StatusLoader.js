import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  wrapper: {
    borderRadius: "16.5px",
    backgroundColor: "#eff2f4",
    marginLeft: "auto",
    lineHeight: 1,
    color: "#517085",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center"
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
        color="primary"
        size="16px"
        className={props.classes.spinner}
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
