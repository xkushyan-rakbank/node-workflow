import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./styled";
export const AccountFeatureListing = ({ title, featureData, mobileAccountsData }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.featureSectionMobile}>
        <h3 className={classes.featureSectionTitle}>{title}</h3>
        {featureData.map((accountsDataRow, index) => (
          <Grid container key={index} className={classes.featureListWrapper}>
            <Grid item sm={3} xs={4}>
              {accountsDataRow.info}
            </Grid>
            {mobileAccountsData?.map((mobileAccount, id) => (
              <Grid item sm={3} xs={4} key={id}>
                {accountsDataRow[mobileAccount].ic ? (
                  <img src={accountsDataRow[mobileAccount].ic} alt="img" />
                ) : (
                  accountsDataRow[mobileAccount]
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
      <div className={classes.featureSection}>
        <h3 className={classes.featureSectionTitle}>{title}</h3>
        {featureData &&
          featureData.map(({ starter, currentAccount, elite, info }, id) => (
            <Grid container key={id}>
              <Grid item sm={3} className={classes.featureList}>
                {info}
              </Grid>
              <Grid item sm={3} className={classes.featureList}>
                {starter.ic ? <img src={starter.ic} alt="starter" /> : starter}
              </Grid>
              <Grid item sm={3} className={classes.featureList}>
                {currentAccount.ic ? (
                  <img src={currentAccount.ic} alt="currentAccount" />
                ) : (
                  currentAccount
                )}
              </Grid>
              <Grid item sm={3} className={classes.featureList}>
                {elite.ic ? <img src={elite.ic} alt="elite" /> : elite}
              </Grid>
            </Grid>
          ))}
      </div>
    </div>
  );
};
