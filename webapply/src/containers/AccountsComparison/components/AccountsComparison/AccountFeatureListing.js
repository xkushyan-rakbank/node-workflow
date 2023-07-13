import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./styled";
export const AccountFeatureListing = ({ title, featureData }) => {
  const classes = useStyles();
  return (
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
  );
};
