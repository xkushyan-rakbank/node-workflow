import React from "react";
import { SearchApplicationList } from "../SearchApplicationList";

export const SearchResult = ({ searchResults }) => (
  <>
    <h2>Search Results</h2>
    {searchResults ? (
      <SearchApplicationList currentApplications={searchResults} />
    ) : (
      <div>No Record Found.</div>
    )}
  </>
);
