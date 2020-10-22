import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import routes from "../../../../routes";
import { useStyles } from "./styled";
import { ReactComponent as ImageOutline } from "../../../../assets/icons/image-outline.svg";

export const UploadLimitComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.sectionContainer}>
      <Grid item xs={12}>
        <ImageOutline alt="image icon" className={classes.iconContainer} />
      </Grid>
      <p className={classes.containerText}>
        Oops! you have reached the maximum no. of documents uploads. Let&apos;s have someone call
        you back within one day to help you out.
      </p>
      <p className={classes.containerText}>
        Looking for other products or services to grow your business?
      </p>
      <Grid item xs={12} className={classes.btnContainer}>
        <Link to={routes.accountsComparison}>
          <Button
            onClick={() => ""}
            color="primary"
            variant="contained"
            className={classes.actionButton}
          >
            Explore Now
          </Button>
        </Link>
      </Grid>
    </div>
  );
};
