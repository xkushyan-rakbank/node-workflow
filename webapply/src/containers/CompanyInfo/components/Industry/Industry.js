import React from "react";
import { FieldArray } from "formik";

import { AutoSaveField as Field, SelectAutocomplete } from "../../../../components/Form";

export const Industry = ({ datalistId, values }) => {
  return (
    <>
      <FieldArray
        name="industries"
        render={arrayHelper =>
          values?.industries.map((item, industryIndex) => {
            // eslint-disable-next-line max-len
            const currentIndustry = `prospect.orgKYCDetails.industryMultiSelect[0].industry[${industryIndex}]`;
            // eslint-disable-next-line max-len
            const currentSubCategory = `prospect.orgKYCDetails.industryMultiSelect[0].subCategory[${industryIndex}]`;

            return (
              <React.Fragment key={item.id}>
                <Field
                  name={`industries[${industryIndex}].industry`}
                  path={currentIndustry}
                  label="Industry"
                  component={SelectAutocomplete}
                  datalistId={datalistId}
                  changeProspect={(prospect, value) => {
                    if (industryIndex) {
                      return prospect;
                    }

                    return {
                      ...prospect,
                      // eslint-disable-next-line max-len
                      [`prospect.orgKYCDetails.industryMultiSelect[0].industry[${industryIndex}]`]: value
                    };
                  }}
                  shrink={true}
                  tabIndex="0"
                  infoTitle="This should be the same as shown on your trade licence."
                />
                <Field
                  name={`industries[${industryIndex}].subCategory`}
                  path={currentSubCategory}
                  label="Industry sub-category"
                  component={SelectAutocomplete}
                  datalistId={datalistId}
                  filterOptionsDeps={item.industry}
                  filterOptions={options => {
                    // All previous industries with selected industry
                    const previousSelectedIndustries = values.industries.filter(
                      item => item.industry === values.industries[industryIndex].industry
                    );
                    // All previous selected subcategories for selected industry
                    const previousSelectedSubCategories = previousSelectedIndustries.map(
                      item => item.subCategory
                    );

                    return options
                      .filter(({ value }) => item.industry === value)
                      .reduce((acc, curr) => {
                        // All subCategories for selected industry
                        const allSubCategories = curr.subGroup;
                        // Array with current selected subCategory
                        const currentSelectedValue = allSubCategories.filter(
                          ({ value }) => value === item.subCategory
                        );
                        // Not selected subCategories yet
                        const availableSubCategories = allSubCategories.filter(
                          sub => !previousSelectedSubCategories.includes(sub.value)
                        );

                        return curr.subGroup && availableSubCategories
                          ? [...acc, ...availableSubCategories, ...currentSelectedValue]
                          : acc;
                      }, []);
                  }}
                  disabled={!item.industry}
                  tabIndex="0"
                  infoTitle="This should accurately reflect the products or services you deal in. If there isn't an exact match, select the next closest one."
                />
              </React.Fragment>
            );
          })
        }
      />
    </>
  );
};
