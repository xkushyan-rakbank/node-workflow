import React from "react";
import { Button } from "@material-ui/core";
import { ReactComponent as Check } from "../../../assets/icons/credit_score.svg";
import { useStyles } from "../styled";

export const SelectServicePackage = () => {
  const classes = useStyles();
  return (
    <div className={classes.packageSelectionWrapper}>
      <div className={classes.packageSelectionTitle}>
        <h3>Select your package</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className={classes.packageListWrapper}>
        <div className={classes.packageList}>
          <div className={classes.packageListTitle}>
            <h2>RAKvalue SME Plus</h2>
            <p>49 AED/month</p>
          </div>
          <ul className={classes.serviceList}>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>
                All-in-one basic business solution:
                <ul className={classes.serviceSubList}>
                  <li>Connected banking</li>
                  <li>Automated accounting</li>
                </ul>
              </div>
            </li>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>Basic business insurance</div>
            </li>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>A range of other banking and lifestyle perks</div>
            </li>
          </ul>
          <Button variant="outlined" className={classes.selectBtn}>
            Select
          </Button>
        </div>
        <div className={classes.packageList}>
          <div className={classes.packageListTitle}>
            <h2>RAKvalue SME Plus</h2>
            <p>49 AED/month</p>
          </div>
          <ul className={classes.serviceList}>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>
                All-in-one basic business solution:
                <ul className={classes.serviceSubList}>
                  <li>Connected banking</li>
                  <li>Automated accounting</li>
                </ul>
              </div>
            </li>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>Basic business insurance</div>
            </li>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>A range of other banking and lifestyle perks</div>
            </li>
          </ul>
          <Button variant="outlined" className={classes.selectBtn}>
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};
