import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

export const useStyles = makeStyles({
  skeleton: {
    width: "100%",
    height: "56px",
    borderRadius: "8px",
    marginBottom: "24px"
  }
});

export const SkeletonLoader = ({ isLoading, field }) => {
  const clasess = useStyles();
  return isLoading ? <Skeleton variant="rect" className={clasess.skeleton} /> : field;
};
