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

import { useStyles } from "./styled";

export const MyApplications = ({ searchResults, getProspectInfo, isLoading }) => {
  const classes = useStyles();

  const [selectedView, setSelectedView] = useState(LIST_VIEW);

  return (
    <div className={classes.centeredContainer}>
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

      {searchResults && (
        <div
          className={cx({
            [classes.viewColumn]: selectedView === LIST_VIEW,
            [classes.veiwRow]: selectedView === GRID_VIEW
          })}
        >
          {selectedView === LIST_VIEW && (
            <>
              {isLoading ? (
                <ApplicationsSkeleton />
              ) : (
                <ApplicationList
                  applicantInfo={searchResults.searchResult}
                  getProspectInfo={getProspectInfo}
                />
              )}
            </>
          )}
          {selectedView === GRID_VIEW && (
            <>
              {isLoading ? (
                <ApplicationsSkeleton />
              ) : (
                <ApplicationGrid
                  applicantInfo={searchResults.searchResult}
                  getProspectInfo={getProspectInfo}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
