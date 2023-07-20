import React, { useState } from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription } from "./constants";
import { Grid, MenuItem, Select } from "@material-ui/core";
import cx from "classnames";
import { COMPARED_ACCOUNTS_TYPES } from "../TableCompare/components/StyledTableBodyMobile/constants";
import { accountTypes } from "../../constants";
import { BootstrapInput } from "../TableCompare/components/StyledTableBodyMobile/styled";

export const AccountCardComponent = (props) => {
  const classes = useStyles();
  const [mobileAccounts, setMobileAccounts] = useState(COMPARED_ACCOUNTS_TYPES.starter);

  function updateFeatureType(mobileData, typeToUpdate, newValue) {
    const featureTypes = mobileData.map((item) => {
      if (item.type === typeToUpdate) {
        return { ...item, value: newValue };
      }
      return item;
    });

    props.handleFeatureType(featureTypes);
  }
  return (
    <>
      <Grid container>
        {Object.keys(accountTypesDescription).map((keyName, i) => (
          <Grid
            item
            sm={3}
            key={i}
            className={cx(
              classes.accountTypeWrapper,
              props.accountSticky ? classes.accountTypeSticky : classes.accountType
            )}
          >
            <AccountTypeCard
              {...accountTypesDescription[keyName]}
              {...props}
              accountTypeName={accountTypesDescription[keyName].accountName}
              isSticky={props.accountSticky}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container className={classes.mobileAccountCard}>
        {mobileAccounts.map((mobileAccount, index) => (
          <Grid item sm={6} key={index}>
            <Select
              value={mobileAccount}
              onChange={(e) => {
                const newMobileAccounts = [...mobileAccounts];
                newMobileAccounts[index] = e.target.value;
                updateFeatureType(newMobileAccounts, index, e.target.value);
                setMobileAccounts(newMobileAccounts);
              }}
              input={<BootstrapInput />}
            >
              {Object.entries(accountTypes).map(
                ([_, { id, name }]) =>
                  mobileAccounts[1 - index] !== id && (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  )
              )}
            </Select>
          </Grid>
        ))}
        {mobileAccounts.map((mobileAccount, index) => (
          <Grid
            item
            sm={6}
            key={index}
            className={cx(
              classes.accountTypeWrapper,
              props.accountSticky ? classes.accountTypeSticky : classes.accountType
            )}
          >
            <AccountTypeCard
              {...props}
              {...accountTypesDescription[mobileAccount]}
              {...props}
              accountTypeName={accountTypesDescription[mobileAccount].accountName}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
