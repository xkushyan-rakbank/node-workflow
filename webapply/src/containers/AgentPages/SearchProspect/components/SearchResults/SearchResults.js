import React from "react";

import { SearchItem } from "./SearchItem";

import { useStyles } from "./styled";

export const SearchResults = ({ searchResults }) => {
  const classes = useStyles();

  if (!searchResults.length) return <div>No Record Found.</div>;

  return (
    <>
      <h2>Search Results</h2>
      <div className={classes.wrapper}>
        <div className={classes.applicationRow}>
          <div className={classes.column}>
            <div className={classes.heading}>Applicant{"'"}s Detail</div>
          </div>
          <div className={classes.column}>
            <div className={classes.heading}>Company Detail</div>
          </div>
          <div className={classes.column}>
            <div className={classes.heading}>Status</div>
          </div>
        </div>
        {searchResults.map(application => (
          <SearchItem key={application.prospectId} application={application} />
        ))}
      </div>
    </>
  );
};
