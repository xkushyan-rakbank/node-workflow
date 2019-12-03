import React, { useState } from "react";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { ICONS } from "../../../components/Icons";
import { ApplicationList } from "./ApplicationList";
import { ApplicationGrid } from "./ApplicationGrid";
import { ButtonWithIcon } from "./ButtonWithIcon";

import { useStyles } from "./styled";

const LIST_VIEW = "list";
const GRID_VIEW = "grid";

export const MyApplications = ({ searchResults, getProspectInfo }) => {
  const classes = useStyles();

  const [selectedView, setSelectedView] = useState(LIST_VIEW);

  return (
    <div className={classes.centeredContainer}>
      <Grid container direction="row" alignItems="center" justify="space-between">
        <Typography classes={{ root: classes.rootTitle }} variant="h5">
          My applications
        </Typography>
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
            <ApplicationList
              applicantInfo={searchResults.searchResult}
              getProspectInfo={getProspectInfo}
            />
          )}
          {selectedView === GRID_VIEW && (
            <ApplicationGrid
              applicantInfo={searchResults.searchResult}
              getProspectInfo={getProspectInfo}
            />
          )}
        </div>
      )}
    </div>
  );
};
