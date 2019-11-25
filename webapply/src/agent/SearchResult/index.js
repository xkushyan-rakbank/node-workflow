import React from "react";
import { SearchApplicationList } from "./../SearchApplicationList/index";

const SearchResult = props => {
  return (
    <>
      <h2>Search Results</h2>
      {props.searchResults.length ? (
        <SearchApplicationList currentApplications={props.searchResults} />
      ) : (
        <div>No Record Found.</div>
      )}
    </>
  );
};

export default SearchResult;
