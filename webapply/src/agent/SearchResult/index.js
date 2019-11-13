import React from "react";
import SearchApplicationList from "./../SearchApplicationList/index";
import { titles, errorMsgs } from "./constants";

const SearchResult = props => {
  return (
    <>
      <h2>{titles.SEARCH_RESULTS_TITLE}</h2>
      {props.searchResults.length ? (
        <SearchApplicationList currentApplications={props.searchResults} />
      ) : (
        <div>{errorMsgs.NO_RECORD_FOUND_ERROR}</div>
      )}
    </>
  );
};

export default SearchResult;
