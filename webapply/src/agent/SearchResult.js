import React from "react";
import SearchApplicationList from "./SearchApplicationList";

class SearchResult extends React.Component {
  render() {
    return (
      <>
        <h2>Search Results</h2>
        <SearchApplicationList currentApplications={this.props.searchResults} />
      </>
    );
  }
}

export default SearchResult;
