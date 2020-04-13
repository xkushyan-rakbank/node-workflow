import React, { useCallback, useState, useEffect } from "react";

import { SearchProspect } from "./components/SearchProspect/SearchProspect";

export const SearchProspectPage = ({
  searchApplications,
  searchResults,
  isLoading,
  resetProspect
}) => {
  const [isSearchLaunched, setSearchStatus] = useState(false);

  useEffect(() => {
    resetProspect();
  }, [resetProspect]);

  const handleSearch = useCallback(
    values => {
      setSearchStatus(true);
      searchApplications(values);
    },
    [searchApplications]
  );

  return (
    <SearchProspect
      onSearch={handleSearch}
      isLoading={isLoading}
      isSearchLaunched={isSearchLaunched}
      searchResults={searchResults}
    />
  );
};
