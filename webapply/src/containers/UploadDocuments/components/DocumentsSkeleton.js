import React from "react";

import { SkeletonLoader } from "../../../components/Form/SkeletonLoader";

import { useStyles } from "./styled";

const range = (end, start = 0) => Array.from({ length: end - start }, (_, i) => start + i);

export const DocumentsSkeleton = ({ count = 2 }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <header className={classes.header}>
          <SkeletonLoader className={classes.nameSkeleton} />
        </header>
        {range(count).map(index => (
          <div className={classes.fileUploadPlaceholder} key={index}>
            <SkeletonLoader className={classes.contentSkeleton} />
            <SkeletonLoader className={classes.buttonSkeleton} />
          </div>
        ))}
      </div>
    </>
  );
};
