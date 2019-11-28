import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { Icon, ICONS } from "./../../components/Icons";

import ApplicationList from "./List";
import ApplicationGrid from "./Grid";

import { searchApplications } from "../../store/actions/searchProspect";
import { getApplicantInfo } from "../../store/selectors/appConfig";
import { getSearchResult } from "./../../store/selectors/searchProspect";

import { useStyles } from "./styled";

const ButtonWithIcon = ({ iconName, iconSelected, typeView, selectedView, handleClick }) => {
  const isSelected = selectedView === typeView;
  return (
    <button className={cx({ selected: isSelected })} onClick={() => handleClick(typeView)}>
      <Icon name={isSelected ? iconName : iconSelected} />
    </button>
  );
};

const defaultView = "list";

const MyApplications = ({ searchResults, searchApplications, inputParam }) => {
  const classes = useStyles();

  const [selectedView, setSelectedView] = useState(defaultView);

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
            iconName={ICONS.list}
            iconSelected={ICONS.listGray}
            typeView="list"
            selectedView={selectedView}
            handleClick={handleChangeView}
          />
          <ButtonWithIcon
            iconName={ICONS.gridWhite}
            iconSelected={ICONS.grid}
            typeView="grid"
            selectedView={selectedView}
            handleClick={handleChangeView}
          />
        </Box>
      </Grid>

      {searchResults && (
        <div className={selectedView === defaultView ? classes.viewColumn : classes.veiwRow}>
          {selectedView === defaultView ? (
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
