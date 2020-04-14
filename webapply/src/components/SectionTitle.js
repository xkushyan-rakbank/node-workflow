import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import { InfoTitle } from "./InfoTitle";

const styles = {
  wrapper: {
    display: "flex",
    fontSize: "20px",
    fontWeight: 600,
    alignItems: "center",
    color: "#373737",
    marginBottom: "10px"
  },
  divider: {
    width: "4px",
    height: "16px",
    borderRadius: "2px",
    backgroundColor: "#373737",
    marginRight: "11px"
  }
};

const SectionTitle = props => {
  const { classes, title, subTitle } = props;
  return (
    <>
      <div className={cx(classes.wrapper, props.className)}>
        <div className={classes.divider} />
        {title}
      </div>
      {!!subTitle && <InfoTitle title={subTitle} />}
    </>
  );
};

export default withStyles(styles)(SectionTitle);
