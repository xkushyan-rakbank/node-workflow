import React from "react";

import { useStyles } from "./styled";
import { SearchProspectForm } from "../SearchProspectForm/SearchProspectForm";
import { SearchResults } from "../SearchResults/SearchResults";
import { Footer } from "../../../../../components/Footer";
import { BackLink } from "../../../../../components/Buttons/BackLink";
import routes from "../../../../../routes";

export const SearchProspect = ({
  onSearch,
  isLoading,
  isSearchLaunched,
  searchResults,
  searchError,
  searchErrorDesc
}) => {
  const classes = useStyles();
  return (
    <div className={classes.baseForm}>
      <h2>Search Applications</h2>
      <SearchProspectForm onSearch={onSearch} isLoading={isLoading} />
      {isSearchLaunched && !isLoading && (
        <SearchResults
          searchResults={searchResults}
          searchError={searchError}
          searchErrorDesc={searchErrorDesc}
        />
      )}
      <Footer hideSaveClose={true} extraClasses={"oneElement"}>
        <BackLink path={routes.login} isTypeButton={true} />
      </Footer>
    </div>
  );
};
