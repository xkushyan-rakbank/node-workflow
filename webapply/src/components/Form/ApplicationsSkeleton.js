import React from "react";
import range from "lodash/range";
import { useStyles } from "./../../containers/MyApplications/components/styled";

import { SkeletonLoader } from "./SkeletonLoader";

export const ApplicationsSkeleton = ({ counts = 4 }) => {
  const classes = useStyles();
  return range(counts).map((_, index) => (
    <div className={classes.wrapper} key={index}>
      <div className={classes.applicationRow}>
        <SkeletonLoader width={210} height={50} style={{ marginBottom: 2 }} />
        <SkeletonLoader width={100} height={30} style={{ marginLeft: 200, marginBottom: 0 }} />
        <SkeletonLoader width={200} height={40} style={{ marginLeft: 50, marginBottom: 0 }} />
      </div>
    </div>
  ));
};
