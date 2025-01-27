import React, { useState } from "react";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ICONS } from "../../../components/Icons";
import { ApplicationList } from "./ApplicationList";
import { ApplicationGrid } from "./ApplicationGrid";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { GRID_VIEW, LIST_VIEW } from "../constants";
import { ApplicationsSkeleton } from "./ApplicationsSkeleton";
import declinedRegular from "../../../assets/gif/declined_regular.gif";

import { useStyles } from "./styled";

export const MyApplications = ({
  getProspectInfo,
  isLoading,
  searchResults,
  loadingProspectId
}) => {
  const classes = useStyles();

  const [selectedView, setSelectedView] = useState(LIST_VIEW);

  if (!isLoading && !searchResults.length) {
    return (
      <div className={classes.centeredContainer}>
        <img className={classes.noRecordsIcon} src={declinedRegular} alt="No records" />
        <p className={classes.noRecordsText}>
          Sorry, no record was found for the details provided.
        </p>
      </div>
    );
  }

  return (
    <div className={classes.centeredContainer}>
      <h3 className={classes.heading}>Your applications, at a glance</h3>
      <Grid
        container
        classes={{ root: "hide-on-mobile" }}
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <SectionTitleWithInfo className={classes.title} title="My applications" />
        <Box classes={{ root: classes.rootChangeViewContainer }}>
          <ButtonWithIcon
            icon={ICONS.listGray}
            isSelected={selectedView === LIST_VIEW}
            handleClick={() => setSelectedView(LIST_VIEW)}
          />
          <ButtonWithIcon
            icon={ICONS.grid}
            isSelected={selectedView === GRID_VIEW}
            handleClick={() => setSelectedView(GRID_VIEW)}
          />
        </Box>
      </Grid>
      <div
        className={cx({
          [classes.viewColumn]: selectedView === LIST_VIEW,
          [classes.veiwRow]: selectedView === GRID_VIEW
        })}
      >
        {isLoading ? (
          <ApplicationsSkeleton />
        ) : selectedView === LIST_VIEW ? (
          <ApplicationList
            applicantInfo={searchResults}
            getProspectInfo={getProspectInfo}
            loadingProspectId={loadingProspectId}
          />
        ) : (
          <ApplicationGrid
            applicantInfo={searchResults}
            getProspectInfo={getProspectInfo}
            loadingProspectId={loadingProspectId}
          />
        )}
      </div>
    </div>
  );
};
