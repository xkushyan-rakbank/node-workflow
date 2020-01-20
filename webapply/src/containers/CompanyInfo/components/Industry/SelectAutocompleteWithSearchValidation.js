import React, { useState } from "react";

import { ErrorMessage } from "../../../../components/Notifications";
import { SelectAutocomplete } from "../../../../components/Form";

export const SelectAutocompleteWithSearchValidation = ({ ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchErrorearchValue] = useState("");

  const handleSearchChange = value => {
    if (value.length <= 12) {
      setSearchValue(value);
      setSearchErrorearchValue("");
    } else {
      setSearchErrorearchValue("Max length of search field is 12!");
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
