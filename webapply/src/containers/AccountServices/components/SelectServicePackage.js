import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import cx from "classnames";
import { ReactComponent as Check } from "../../../assets/icons/credit_score.svg";
import { useStyles } from "../styled";
import { updateProspect } from "../../../store/actions/appConfig";
import { getRakValuePackage } from "../../../store/selectors/appConfig";

export const SelectServicePackage = ({ setFormFieldValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedService, setSelectedService] = useState("RAK value SME plus");

  const selectedPackage = selectedPackage => {
    setSelectedService(selectedPackage);
    setFormFieldValue("rakValuePackage", selectedPackage);
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
        <p>Simplify your business banking with a package that offers convenience and perks.</p>
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
                All-in-one basic business solution with:
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
            {selectedService === "RAK value SME plus" ? "Selected" : "Select"}
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
                All-in-one advanced business solution with:
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
            {selectedService === "RAK value SME max" ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    </div>
  );
};
