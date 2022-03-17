import React, { useContext } from "react";
import { LandingVideoPlayer } from "../LandingVideoPlayer/LandingVideoPlayer";
import { landingVideo } from "../../../../constants/videos";
import { useStyles } from "./styled";
import { VerticalPaginationContext } from "../../../../components/VerticalPagination/VerticalPaginationProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const QuickapplyLandingComponent = () => {
  const classes = useStyles();
  const { setCurrentSection } = useContext(VerticalPaginationContext);
  
  return (
    <HelmetProvider>
      <Helmet>
        <title>{"Quick Apply | Online Application for Business Accounts and Finance | RAKBANK"}</title>
      </Helmet>
    <div className={classes.container}>
      <div className={classes.paginationWrapper}>
        <div className={classes.childWrapper}>
          <LandingVideoPlayer video={landingVideo} classes={{ video: classes.video }} />
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
};
