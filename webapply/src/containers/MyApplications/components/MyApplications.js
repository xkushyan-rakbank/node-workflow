import React from "react";
import Grid from "@material-ui/core/Grid";

import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ApplicationsSkeleton } from "./ApplicationsSkeleton";
import declinedRegular from "../../../assets/gif/declined_regular.gif";

import { useStyles } from "./styled";
import { SearchResults } from "../../AgentPages/SearchProspect/components/SearchResults/SearchResults";

export const MyApplications = ({
  getProspectInfo,
  isLoading,
  searchResults,
  loadingProspectId
}) => {
  const classes = useStyles();

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
        justifyContent="space-between"
      >
        <SectionTitleWithInfo className={classes.title} title="My applications" />
      </Grid>

      {isLoading ? (
        <ApplicationsSkeleton />
      ) : (
        <SearchResults
          searchResults={searchResults}
          getProspectInfo={getProspectInfo}
          loadingProspectId={loadingProspectId}
        />
      )}
    </div>
  );
};
