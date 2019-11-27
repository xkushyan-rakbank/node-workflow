import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import list_ic from "../../assets/icons/list_white_ic.png";
import list_gray_ic from "../../assets/icons/list_gray_ic.png";
import grid_ic from "../../assets/icons/grid_grey_ic.png";
import grid_white_ic from "../../assets/icons/grid_white_ic.png";

import ApplicationList from "./List";
import ApplicationGrid from "./Grid";

import { searchApplications } from "../../store/actions/searchProspect";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getSearchResult } from "./../../store/selectors/searchProspect";

import { useStyles } from "./styled";

const ButtonWithIcon = ({ icon, iconSelected, typeView, selectedView, handleClick }) => {
  const isSelected = selectedView === typeView;
  return (
    <button className={cx({ selected: isSelected })} onClick={() => handleClick(typeView)}>
      <img src={isSelected ? icon : iconSelected} alt="type view" />
    </button>
  );
};

const MyApplications = ({ searchResults, searchApplications, inputParam }) => {
  const classes = useStyles();

  const [selectedView, setSelectedView] = useState("list");

  useEffect(() => {
    searchApplications(inputParam);
  }, [searchApplications, inputParam]);

  const handleChangeView = useCallback(
    view => {
      setSelectedView(view);
    },
    [setSelectedView]
  );

  return (
    <div className={classes.centeredContainer}>
      <Grid container direction="row" alignItems="center" justify="space-between">
        <Typography classes={{ root: classes.rootTitle }} variant="h5">
          My applications
        </Typography>
        <Box classes={{ root: classes.rootChangeViewContainer }}>
          <ButtonWithIcon
            icon={list_ic}
            iconSelected={list_gray_ic}
            typeView="list"
            selectedView={selectedView}
            handleClick={handleChangeView}
          />
          <ButtonWithIcon
            icon={grid_white_ic}
            iconSelected={grid_ic}
            typeView="grid"
            selectedView={selectedView}
            handleClick={handleChangeView}
          />
        </Box>
      </Grid>

      {searchResults && (
        <div className={selectedView === "list" ? classes.viewColumn : classes.veiwRow}>
          {selectedView === "list" ? (
            <ApplicationList applicantInfo={searchResults.searchResult} />
          ) : (
            <ApplicationGrid applicantInfo={searchResults.searchResult} />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  searchResults: getSearchResult(state),
  inputParam: getApplicantInfo(state)
});

const mapDispatchToProps = {
  searchApplications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApplications);
