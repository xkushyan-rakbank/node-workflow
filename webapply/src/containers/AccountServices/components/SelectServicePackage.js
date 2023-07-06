import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import cx from "classnames";
import { ReactComponent as Check } from "../../../assets/icons/credit_score.svg";
import { useStyles } from "../styled";
import { updateProspect } from "../../../store/actions/appConfig";

export const SelectServicePackage = ({ setFieldValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState("");
  const selectedPackage = selectedPackage => {
    console.log(selectedPackage);
    setSelectedService(selectedPackage);
    setFieldValue("rakValuePackage", selectedPackage);
    dispatch(
      updateProspect({
        "prospect.applicationInfo.rakValuePackage": selectedPackage
      })
    );
  };
  return (
    <div className={classes.packageSelectionWrapper}>
      <div className={classes.packageSelectionTitle}>
        <h3>Select your package</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className={classes.packageListWrapper}>
        <div
          className={cx(classes.packageList, {
            [classes.selectedPackageList]: selectedService === "RAK value SME plus"
          })}
          onClick={() => selectedPackage("RAK value SME plus")}
        >
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
                  <li>Integrated VAT</li>
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
          <Button
            variant="outlined"
            className={cx(classes.selectBtn, {
              [classes.selectedPackageListBtn]: selectedService === "RAK value SME plus"
            })}
          >
            Select
          </Button>
        </div>
        <div
          className={cx(classes.packageList, {
            [classes.selectedPackageList]: selectedService === "RAK value SME max"
          })}
          onClick={() => selectedPackage("RAK value SME max")}
        >
          <div className={classes.packageListTitle}>
            <h2>RAKvalue SME Max</h2>
            <p>149 AED/month</p>
          </div>
          <ul className={classes.serviceList}>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>
                All-in-one advanced business solution:
                <ul className={classes.serviceSubList}>
                  <li>Connected banking</li>
                  <li>Automated accounting</li>
                  <li>Integrated VAT</li>
                </ul>
              </div>
            </li>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>Advanced business insurance</div>
            </li>
            <li>
              <Check className={classes.serviceListIcon} />
              <div>A range of other banking and lifestyle perks</div>
            </li>
          </ul>
          <Button
            variant="outlined"
            className={cx(classes.selectBtn, {
              [classes.selectedPackageListBtn]: selectedService === "RAK value SME max"
            })}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};
