import React from "react";
import { SearchApplicationList } from "../SearchApplicationList";

export const SearchResult = ({ searchResults, searchStatus, isLoading }) => (
  <>
    {searchResults.length ? (
      <>
        <h2>Search Results</h2>
        <SearchApplicationList currentApplications={searchResults} />
      </>
    ) : !isLoading && searchStatus ? (
      <>
        <h2>Search Results</h2>
        <div>No Record Found.</div>
      </>
    ) : null}
  </>
);
