import React, { useCallback, useState, useEffect, useMemo } from "react";
import { isEmpty } from "lodash";

import { SearchProspect } from "./components/SearchProspect/SearchProspect";
import { useLayoutParams } from "../../FormLayout";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { agentFormStepper, searchProspectStepper } from "../../../constants";

export const SearchProspectPage = ({
  searchApplications,
  searchResults,
  isLoading,
  resetProspect,
  searchError,
  searchErrorDesc,
  dataList,
  roCode
}) => {
  useFormNavigation([false, false, roCode ? agentFormStepper : searchProspectStepper, true, true]);
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
      isLoading={isLoading || isEmpty(dataList)}
      isSearchLaunched={isSearchLaunched}
      searchResults={searchResults}
      searchError={searchError}
      searchErrorDesc={searchErrorDesc}
    />
  );
};
