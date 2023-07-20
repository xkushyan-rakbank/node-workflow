import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./styled";
export const AccountFeatureListing = ({ title, featureData, featureType, featureDataMobile }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.featureSectionMobile}>
        <h3 className={classes.featureSectionTitle}>{title}</h3>
        {featureDataMobile &&
          featureDataMobile.map((list, id) => (
            <Grid container key={`${list.name}-${id}`} className={classes.featureList}>
              <Grid item sm={3} xs={4}>
                {list.name}
              </Grid>
              <Grid item sm={3} xs={4}>
                {list.cellOne}
              </Grid>
              <Grid item sm={3} xs={4}>
                {list.cellTwo}
              </Grid>
              {/* <Grid item sm={3} xs={4}>
                {list.cellThree.ic ? <img src={list.cellThree.ic} alt="" /> : list.cellThree}
              </Grid> */}
            </Grid>
          ))}
      </div>
      <div className={classes.featureSection}>
        <h3 className={classes.featureSectionTitle}>{title}</h3>
        {featureData &&
          featureData.map((list, id) => (
            <Grid container key={`${list.name}-${id}`} className={classes.featureList}>
              <Grid item sm={3}>
                {list.name}
              </Grid>
              <Grid item sm={3}>
                {list.cellOne.ic ? <img src={list.cellOne.ic} alt="" /> : list.cellOne}
              </Grid>
              <Grid item sm={3}>
                {list.cellTwo.ic ? <img src={list.cellTwo.ic} alt="" /> : list.cellTwo}
              </Grid>
              <Grid item sm={3}>
                {list.cellThree.ic ? <img src={list.cellThree.ic} alt="" /> : list.cellThree}
              </Grid>
            </Grid>
          ))}
      </div>
    </div>
  );
};
