import React from "react";
import { SearchApplicationList } from "../SearchApplicationList";

export const SearchResult = ({ searchResults, error }) => (
  <>
    <h2>Search Results</h2>
    {searchResults.length && !error ? (
      <SearchApplicationList currentApplications={searchResults} />
    ) : (
      <div>No Record Found.</div>
    )}
  </>
);
