/* eslint-disable max-len */
import React from "react";
import { SearchItem } from "./SearchItem";

import { useStyles } from "./styled";

export const SearchResults = ({
  searchResults,
  searchError = "",
  searchErrorDesc = "",
  getProspectInfo = "",
  loadingProspectId = ""
}) => {
  const classes = useStyles();

  if (!searchResults.length) {
    if (searchError) {
      let errorMsg = "";
      searchErrorDesc[0].errorCode == "12019"
        ? (errorMsg = searchErrorDesc[0].message)
        : (errorMsg = "Something went wrong, please try after sometime.");
      return <div>{errorMsg}</div>;
    } else {
      return <div>No Record Found.</div>;
    }
  }

  return (
    <div className={classes.searchItemContainer}>
      {searchResults.map((application, index) => {
        return (
          <SearchItem
            application={application}
            key={application.prospectId}
            getProspectInfo={getProspectInfo}
            loadingProspectId={loadingProspectId}
          />
        );
      })}
    </div>
  );
};
