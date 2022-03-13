import React, { useEffect, useContext } from "react";

import { LandingVideoPlayer } from "../LandingVideoPlayer/LandingVideoPlayer";
import { landingVideo } from "../../../../constants/videos";
import { useStyles } from "./styled";
import { VerticalPaginationContext } from "../../../../components/VerticalPagination/VerticalPaginationProvider";

export const QuickapplyLandingComponent = () => {
  const classes = useStyles();
  const { setCurrentSection } = useContext(VerticalPaginationContext);

  useEffect(() => {
    setCurrentSection(1);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.paginationWrapper}>
        <div className={classes.childWrapper}>
          <LandingVideoPlayer video={landingVideo} classes={{ video: classes.video }} />
        </div>
      </div>
    </div>
  );
};
