import React from "react";
import { SearchApplicationList } from "../SearchApplicationList";

export const SearchResult = ({ searchResults, error }) => (
  <>
    {searchResults.length ? (
      <>
        <h2>Search Results</h2>
        <SearchApplicationList currentApplications={searchResults} />
      </>
    ) : error ? (
      <>
        <h2>Search Results</h2>
        <div>No Record Found.</div>
      </>
    ) : null}
  </>
);
