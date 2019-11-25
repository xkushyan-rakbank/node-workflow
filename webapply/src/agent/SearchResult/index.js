import React from "react";
import { SearchApplicationList } from "./../SearchApplicationList/index";

export const SearchResult = ({ searchResults }) => (
  <>
    <h2>Search Results</h2>
    {searchResults.length ? (
      <SearchApplicationList currentApplications={searchResults} />
    ) : (
      <div>No Record Found.</div>
    )}
  </>
);
