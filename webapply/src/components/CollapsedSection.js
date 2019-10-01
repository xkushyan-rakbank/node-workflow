import React from "react";
import DoneIcon from "@material-ui/icons/Done";

import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";

const style = {
  collapsedPlaceholder: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    borderTop: "solid 1px rgba(230, 230, 230, 0.5)",
    cursor: "pointer"
  },
  contentContainer: {
    borderTop: "solid 1px rgba(230, 230, 230, 0.5)",
    padding: "25px 15px"
  },
  title: {
    fontSize: "16px",
    fontWeight: "normal",
    opacity: "0.5",
    color: "#263d4c",
    flexGrow: "1"
  },
  activeTitle: {
    textDecoration: "underline"
  },
  iconWrapper: {
    border: "1.5px solid #517085",
    borderRadius: "50%",
    width: "22px",
    fontSize: "22px",
    color: "#517085",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: "14px"
  }
};

const CollapsedSection = ({ classes, expanded, children, filled, title, ...rest }) => {
  return (
    <>
      {expanded ? (
        <div className={classes.contentContainer}>{children}</div>
      ) : (
        <div className={classes.collapsedPlaceholder} {...rest}>
          <div
            className={cx(classes.title, {
              [classes.activeTitle]: filled
            })}
          >
            {title}
          </div>
          {filled && (
            <div className={classes.iconWrapper}>
              <DoneIcon className={classes.icon} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default withStyles(style)(CollapsedSection);
