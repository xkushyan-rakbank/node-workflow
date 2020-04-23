import React, { useCallback, useState, useEffect } from "react";

import { SearchProspect } from "./components/SearchProspect/SearchProspect";
import { useLayoutParams } from "../../FormLayout";

export const SearchProspectPage = ({
  searchApplications,
  searchResults,
  isLoading,
  resetProspect
}) => {
  useLayoutParams(true);

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
