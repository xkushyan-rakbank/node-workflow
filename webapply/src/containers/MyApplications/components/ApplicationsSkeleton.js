import React from "react";

import { range } from "../../../utils/documents";
import { SkeletonLoader } from "../../../components/Form/SkeletonLoader";

import { useStyles } from "./styled";

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
