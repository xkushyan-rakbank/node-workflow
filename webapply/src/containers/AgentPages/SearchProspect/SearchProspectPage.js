import React, { useCallback, useState, useEffect } from "react";

import { SearchProspect } from "./components/SearchProspect/SearchProspect";
import { useLayoutParams } from "../../FormLayout";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { agentFormStepper } from "../../../constants";

export const SearchProspectPage = ({
  searchApplications,
  searchResults,
  isLoading,
  resetProspect,
  searchError,
  searchErrorDesc
}) => {
  useFormNavigation([false, false, agentFormStepper, true, true]);
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
      searchError={searchError}
      searchErrorDesc={searchErrorDesc}
    />
  );
};
