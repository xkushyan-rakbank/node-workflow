import React from "react";
import cx from "classnames";
import CustomCheckbox from "../../../../../../components/InputField/RefactoredCheckbox";
import Grid from "@material-ui/core/Grid";
import TextInput from "../../../../../../components/InputField/TextInput";
import PureSelect from "../../../../../../components/InputField/PureSelect";
import AddButton from "../../../../../../components/Buttons/AddButton";
import RemoveButton from "../../../../../../components/Buttons/RemoveButton";
import { limits } from "./constants";
import { useStyles } from "./styled";

export const CompanyBusinessRelationshipsComponent = ({
  setIsContinueDisabled,
  updateProspect,
  otherBankDetails,
  isDontTradeGoodsYet,
  topOriginGoodsCountries,
  isDontHaveSuppliersYet,
  topSuppliers,
  topCustomers,
  otherBankingRelationshipsExist,
  index
}) => {
  const classes = useStyles();

  // TODO implement check disabled for continue button
  // useEffect(() => {
  //   function isContinueDisabled() {
  //     const lastMandatoryFieldValue = getLastMandatoryFieldValue();
  //     return !lastMandatoryFieldValue;
  //   }
  //   setIsContinueDisabled(isContinueDisabled());
  // }, [setIsContinueDisabled, getLastMandatoryFieldValue]);

  function handleAddItem(items, prospect, limit, item) {
    if (items.length < limit) {
      const path = `prospect.orgKYCDetails.${prospect}`;
      updateProspect({
        [path]: [...items, item]
      });
    }
  }

  function handleRemoveItem(items, index, prospect) {
    const dataList = [...items];
    dataList.splice(index, 1);
    const path = `prospect.orgKYCDetails.${prospect}`;
    updateProspect({
      [path]: [...dataList]
    });
  }

  function checkboxCallback(value, id) {
    if (value) {
      if (id === "Okyc.isDontHaveSuppliersYet_") {
        updateProspect({
          "prospect.orgKYCDetails.topSuppliers": [{ name: "", country: "" }]
        });
      } else if (id === "Okyc.isDontTradeGoodsYet_") {
        updateProspect({
          "prospect.orgKYCDetails.topOriginGoodsCountries": [""]
        });
      } else if (id === "OkycObri.otherBankingRelationshipsExist_") {
        updateProspect({
          "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails": [
            { bankName: "" }
          ]
        });
      }
    }
  }

  function isAddButtonDisabled(limit, items, ...fields) {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  }

  return (
    <>
      <h4 className={classes.groupLabel}>Top customers</h4>
      <Grid container spacing={3} className={classes.flexContainer}>
        {topCustomers.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item md={index === 0 ? 6 : 5} sm={12}>
                <TextInput id="OkycTopc.name" indexes={[index]} />
              </Grid>
              <Grid
                item
                md={index === 0 ? 6 : 5}
                sm={12}
                className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
              >
                <PureSelect id="OkycTopc.country" indexes={[index]} resetValue={""} />
                {index !== 0 && (
                  <RemoveButton
                    onClick={() => handleRemoveItem(topCustomers, index, "topCustomers")}
                    title="Delete"
                  />
                )}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      {topCustomers.length < limits.CUSTOMER_COUNT && (
        <AddButton
          onClick={() =>
            handleAddItem(topCustomers, "topCustomers", limits.CUSTOMER_COUNT, {
              name: "",
              country: ""
            })
          }
          title="Add another customer"
          disabled={isAddButtonDisabled(limits.CUSTOMER_COUNT, topCustomers, "name", "country")}
        />
      )}

      <div className={classes.divider} />

      <h4 className={classes.groupLabel}>Top suppliers</h4>
      <CustomCheckbox
        id="Okyc.isDontHaveSuppliersYet"
        indexes={[index]}
        callback={checkboxCallback}
      />
      <Grid container spacing={3} className={classes.flexContainer}>
        {topSuppliers.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item md={index === 0 ? 6 : 5} sm={12}>
                <TextInput
                  id="OkycTops.name"
                  indexes={[index]}
                  disabled={isDontHaveSuppliersYet}
                  required={!isDontHaveSuppliersYet}
                />
              </Grid>
              <Grid
                item
                md={index === 0 ? 6 : 5}
                sm={12}
                className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
              >
                <PureSelect
                  id="OkycTops.country"
                  indexes={[index]}
                  resetValue={""}
                  required={!isDontHaveSuppliersYet}
                  disabled={isDontHaveSuppliersYet}
                />
                {index !== 0 && (
                  <RemoveButton
                    onClick={() => handleRemoveItem(topSuppliers, index, "topSuppliers")}
                    title="Delete"
                  />
                )}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      {topSuppliers.length < limits.SUPPLIER_COUNT && (
        <AddButton
          onClick={() =>
            handleAddItem(topSuppliers, "topSuppliers", limits.SUPPLIER_COUNT, {
              name: "",
              country: ""
            })
          }
          title="Add another supplier"
          disabled={
            isDontHaveSuppliersYet ||
            isAddButtonDisabled(limits.SUPPLIER_COUNT, topSuppliers, "name", "country")
          }
        />
      )}

      <div className={classes.divider} />

      <h4 className={classes.groupLabel}>Top origin of goods</h4>
      <CustomCheckbox id="Okyc.isDontTradeGoodsYet" indexes={[index]} callback={checkboxCallback} />
      <Grid container direction="column" spacing={3} className={classes.flexContainer}>
        {topOriginGoodsCountries.map((_, index) => {
          return (
            <Grid
              key={index}
              item
              md={6}
              sm={12}
              className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
            >
              <PureSelect
                key={index}
                id="Okyc.topOriginGoodsCountries"
                indexes={[index]}
                resetValue={""}
                excludeValues={topOriginGoodsCountries.filter(
                  (_, valueIndex) => valueIndex !== index
                )}
                required={!isDontTradeGoodsYet}
                disabled={isDontTradeGoodsYet}
              />
              {index !== 0 && (
                <RemoveButton
                  onClick={() =>
                    handleRemoveItem(topOriginGoodsCountries, index, "topOriginGoodsCountries")
                  }
                  title="Delete"
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      {topOriginGoodsCountries.length < limits.COUNTRY_OF_ORIGIN_COUNT && (
        <AddButton
          onClick={() =>
            handleAddItem(
              topOriginGoodsCountries,
              "topOriginGoodsCountries",
              limits.COUNTRY_OF_ORIGIN_COUNT,
              ""
            )
          }
          title="Add another country of origin"
          disabled={
            isDontTradeGoodsYet ||
            isAddButtonDisabled(limits.COUNTRY_OF_ORIGIN_COUNT, topOriginGoodsCountries)
          }
        />
      )}

      <div className={classes.divider} />

      <h4 className={classes.groupLabel}>Relationships with other banks</h4>
      <CustomCheckbox
        id="OkycObri.otherBankingRelationshipsExist"
        indexes={[index]}
        callback={checkboxCallback}
      />
      {otherBankingRelationshipsExist && (
        <>
          <Grid container spacing={3} className={classes.flexContainer}>
            <Grid item sm={12}>
              {otherBankDetails.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid
                      item
                      sm={12}
                      md={index === 0 ? 12 : 10}
                      className={cx(classes.relative, { [classes.marginBottom]: index !== 0 })}
                    >
                      <TextInput
                        id="OkycObriObd.bankName"
                        indexes={[index]}
                        required={otherBankingRelationshipsExist}
                        disabled={!otherBankingRelationshipsExist}
                      />
                      {index !== 0 && (
                        <RemoveButton
                          onClick={() =>
                            handleRemoveItem(
                              otherBankDetails,
                              index,
                              "otherBankingRelationshipsInfo.otherBankDetails"
                            )
                          }
                          title="Delete"
                          classes={{ container: classes.container }}
                        />
                      )}
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          </Grid>
          {otherBankDetails.length < limits.ANOTHER_BANK_COUNT && (
            <AddButton
              onClick={() =>
                handleAddItem(
                  otherBankDetails,
                  "otherBankingRelationshipsInfo.otherBankDetails",
                  limits.ANOTHER_BANK_COUNT,
                  { bankName: "" }
                )
              }
              title="Add another bank"
              disabled={
                !otherBankingRelationshipsExist ||
                isAddButtonDisabled(limits.ANOTHER_BANK_COUNT, otherBankDetails, "bankName")
              }
            />
          )}
        </>
      )}
    </>
  );
};
