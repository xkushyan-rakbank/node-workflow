import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  skeleton: {
    width: "100%",
    height: "56px",
    borderRadius: "8px",
    marginBottom: "24px"
  }
});

export const SkeletonLoader = () => {
  const clasess = useStyles();

  return <Skeleton variant="rect" className={clasess.skeleton} />;
};
