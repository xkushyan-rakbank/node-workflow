import React, { useState } from "react";

import { ErrorMessage } from "../../../../components/Notifications";
import { SelectAutocomplete } from "../../../../components/Form";

export const SearchableSelectAutocomplete = ({ validateSearchField, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearchChange = value => {
    const error = validateSearchField(value);
    setSearchError(error);

    if (!error) {
      setSearchValue(value);
    }
  };

  return (
    <>
      {searchError && (
        <>
          <ErrorMessage error={searchError} />
          <br />
        </>
      )}
      <SelectAutocomplete inputValue={searchValue} onInputChange={handleSearchChange} {...props} />
    </>
  );
};
