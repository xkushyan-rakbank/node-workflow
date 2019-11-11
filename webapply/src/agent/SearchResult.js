import React from "react";
import SearchApplicationList from "./SearchApplicationList";

class SearchResult extends React.Component {
  render() {
    return (
      <>
        <h2>Search Results</h2>
        {this.props.searchResults.length > 0 ? (
          <SearchApplicationList currentApplications={this.props.searchResults} />
        ) : (
          <div>No Record Found</div>
        )}
      </>
    );
  }
}

export default SearchResult;
