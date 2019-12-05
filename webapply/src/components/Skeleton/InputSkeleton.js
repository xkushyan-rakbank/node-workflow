import React from "react";
import { Skeleton } from "@material-ui/lab";
import { useStyles } from "./styled";

export const InputSkeleton = ({ loading, children }) => {
  const clasess = useStyles();
  return loading ? <Skeleton variant="rect" className={clasess.inputSkeleton} /> : children;
};
