import React, { useState } from "react";

import { ErrorMessage } from "../../../../components/Notifications";
import { SelectAutocomplete } from "../../../../components/Form";

export const SelectAutocompleteWithSearchValidation = ({ validateSearchField, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearchChange = async value => {
    const error = await validateSearchField(value);
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
