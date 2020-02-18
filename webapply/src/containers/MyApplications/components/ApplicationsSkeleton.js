import React from "react";
import { useStyles } from "./styled";

import { SkeletonLoader } from "../../../components/Form/SkeletonLoader";

const range = (end, start = 0, length = end - start) => Array.from({ length }, (_, i) => start + i);

export const ApplicationsSkeleton = ({ count = 4 }) => {
  const classes = useStyles();
  return range(count).map(index => (
    <div className={classes.wrapper} key={index}>
      <div className={classes.applicationRow}>
        <SkeletonLoader className={classes.companyNameSkeleton} />
        <SkeletonLoader className={classes.listStatusSkeleton} />
        <SkeletonLoader className={classes.statusNotesSkeleton} />
      </div>
    </div>
  ));
};
