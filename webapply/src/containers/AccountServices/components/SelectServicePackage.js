import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import cx from "classnames";
import { useStyles } from "../styled";
import { updateProspect } from "../../../store/actions/appConfig";
import { getRakValuePackage } from "../../../store/selectors/appConfig";
import { ContexualHelp } from "../../../components/Notifications";
import { bankingBenefits, insuranceBenefits, lifestyleBenefits, otherBenefits } from "../constants";

export const SelectServicePackage = ({ setFormFieldValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rakValuePackage = useSelector(getRakValuePackage);

  const [selectedService, setSelectedService] = useState(rakValuePackage);

  const handleTogglePackage = selectedPackage => {
    const selectedPackageValue = selectedService ? "" : selectedPackage;

    setSelectedService(selectedPackageValue);
    setFormFieldValue("rakValuePackage", selectedPackageValue);

    dispatch(
      updateProspect({
        "prospect.applicationInfo.rakValuePackage": selectedPackageValue
      })
    );
  };
  return (
    <div className={classes.packageSelectionContainer}>
      <div className={classes.packageSelectionTitle}>
        <div className={classes.headerWithHelperIcon}>
          <h3>Select your package </h3>
          <ContexualHelp
            title={
              "Simplify your business banking with a package that offers convenience and perks."
            }
            placement="right"
            isDisableHoverListener={false}
            className={classes.infoIcon}
          >
            <HelpOutlineIcon className={classes.infoIcon} />
          </ContexualHelp>
        </div>
      </div>
      <Grid container className={classes.packageListWrapper}>
        <Grid item sm={4} xs={6} className={classes.packageList}></Grid>
        <Grid item sm={4} xs={6} className={classes.packageList}>
          <div className={classes.packageListTitle}>
            <h2>RAKvalue SME Plus</h2>
            <p>49 AED/month</p>
          </div>
          <Button
            variant="outlined"
            className={cx(classes.selectBtn, {
              [classes.selectedPackageListBtn]: selectedService === "RAKvalue PLUS"
            })}
            onClick={() => handleTogglePackage("RAKvalue PLUS")}
          >
            {selectedService === "RAKvalue PLUS" ? "Selected" : "Select"}
            <ArrowForwardIcon className={classes.selectBtnArrow} />
          </Button>
        </Grid>
        <Grid item sm={4} className={classes.packageList}>
          <div className={classes.packageListTitle}>
            <h2>RAKvalue SME Max</h2>
            <p>149 AED/month</p>
          </div>
          <Button
            variant="outlined"
            className={cx(classes.selectBtn, {
              [classes.selectedPackageListBtn]: selectedService === "RAKvalue MAX"
            })}
            onClick={() => handleTogglePackage("RAKvalue MAX")}
          >
            {selectedService === "RAKvalue MAX" ? "Selected" : "Select"}
            <ArrowForwardIcon className={classes.selectBtnArrow} />
          </Button>
        </Grid>
      </Grid>
      <h3 className={classes.packagefeatureTitle}>Banking benefits</h3>
      {bankingBenefits.map(({ info, rakValue_plus, rakValue_max }, index) => {
        return (
          <Grid container key={index}>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              <p className={classes.featureDesc}>{info}</p>
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_plus && rakValue_plus.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_plus.ic} alt="rakValue_plus" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_plus}</p>
              )}
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_max && rakValue_max.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_max.ic} alt="rakValue_max" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_max}</p>
              )}
            </Grid>
          </Grid>
        );
      })}
      <h3 className={classes.packagefeatureTitle}>Lifestyle Benefits</h3>
      {lifestyleBenefits.map(({ info, rakValue_plus, rakValue_max }, index) => {
        return (
          <Grid container key={index}>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              <p className={classes.featureDesc}>{info}</p>
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_plus && rakValue_plus.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_plus.ic} alt="rakValue_plus" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_plus}</p>
              )}
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_max && rakValue_max.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_max.ic} alt="rakValue_max" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_max}</p>
              )}
            </Grid>
          </Grid>
        );
      })}
      <h3 className={classes.packagefeatureTitle}>Insurance Benefits</h3>
      {insuranceBenefits.map(({ info, rakValue_plus, rakValue_max }, index) => {
        return (
          <Grid container key={index}>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              <p className={classes.featureDesc}>{info}</p>
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_plus && rakValue_plus.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_plus.ic} alt="rakValue_plus" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_plus}</p>
              )}
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_max && rakValue_max.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_max.ic} alt="rakValuemax" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_max}</p>
              )}
            </Grid>
          </Grid>
        );
      })}
      <h3 className={classes.packagefeatureTitle}>Accountable, by Versify</h3>
      {otherBenefits.map(({ info, rakValue_plus, rakValue_max }, index) => {
        return (
          <Grid container key={index}>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              <p className={classes.featureDesc}>{info}</p>
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_plus && rakValue_plus.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_plus.ic} alt="rakValue_plus" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_plus}</p>
              )}
            </Grid>
            <Grid item sm={4} className={classes.packageFeatureWrapper}>
              {rakValue_max && rakValue_max.ic ? (
                <div className={classes.featureValueIcon}>
                  <img src={rakValue_max.ic} alt="rakValue_max" />
                </div>
              ) : (
                <p className={classes.featureValues}>{rakValue_max}</p>
              )}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
