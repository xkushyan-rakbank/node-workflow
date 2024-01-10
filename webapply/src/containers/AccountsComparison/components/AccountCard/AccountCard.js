import React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { Grid, MenuItem, Select } from "@material-ui/core";
import { AccountTypeCard } from "../AccountTypeCard";
import { BootstrapInput } from "../TableCompare/components/StyledTableBodyMobile/styled";
import { accountTypes } from "../../constants";
import { accountTypesDescription } from "./constants";
import { getIsIslamicBanking } from "../../../../store/selectors/appConfig";
import { useStyles } from "./styled";

export const AccountCardComponent = props => {
  const classes = useStyles();
  const isIslamic = useSelector(getIsIslamicBanking);

  return (
    <>
      <Grid container className={classes.desktopAccountCard}>
        {Object.keys(accountTypesDescription).map((keyName, i) => (
          <Grid
            item
            sm={3}
            key={i}
            className={cx(
              classes.accountTypeWrapper,
              classes.accountType,
              { islamicAccountType: isIslamic },
              {
                [classes.accountTypeSticky]: props.accountSticky
              }
            )}
          >
            <AccountTypeCard
              {...accountTypesDescription[keyName]}
              {...props}
              accountTypeName={accountTypesDescription[keyName].accountName}
              isSticky={props.accountSticky}
              isIslamic={isIslamic}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container className={classes.mobileAccountCard}>
        {props.mobileAccounts.map((mobileAccount, index) => (
          <Grid item sm={6} key={index}>
            <Select
              value={mobileAccount}
              onChange={e => {
                const newMobileAccounts = [...props.mobileAccounts];
                newMobileAccounts[index] = e.target.value;
                props.onChangeMobileAccounts(newMobileAccounts);
              }}
              input={<BootstrapInput />}
            >
              {Object.entries(accountTypes).map(
                ([_, { id, name }]) =>
                  props.mobileAccounts[1 - index] !== id && (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  )
              )}
            </Select>
          </Grid>
        ))}
        {props.mobileAccounts.map((mobileAccount, index) => (
          <Grid
            item
            sm={6}
            key={index}
            className={cx(
              classes.accountTypeWrapper,
              { islamicAccountType: isIslamic },
              props.accountSticky ? classes.accountTypeSticky : classes.accountType
            )}
          >
            <AccountTypeCard
              {...props}
              {...accountTypesDescription[mobileAccount]}
              {...props}
              accountTypeName={accountTypesDescription[mobileAccount].accountName}
              isIslamic={isIslamic}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
