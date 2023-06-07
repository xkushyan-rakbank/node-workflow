import React from "react";
import { useFormNavigation } from "../../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../../FormLayout";
import { formStepper } from "../../../../constants";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { ICONS, Icon } from "../../../../components/Icons";
import { useStyles } from "./styled";
import { ColoredAvatar } from "../../../../components/Avatar/ColoredAvatar";

export const AddCompanyInformation = ({ companyName }) => {
  const classes = useStyles();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);

  return (
    <div className={classes.additionalCompanyInfoContainer}>
      <BackLink path={routes.additionalInfoComponent} />
      <div className={classes.infoContainer}>
        <Icon className={classes.infoIcon} alt="collapse-icon" name={ICONS.info} />
        We need the information below to understand your business needs.
      </div>
      <div className={classes.companyInfoDetailWrapper}>
        <div className={classes.companyNameinfoContainer}>
          <ColoredAvatar fullName={companyName} color={"#FDE7E8"}>
            {companyName?.charAt(0)?.toUpperCase()}
          </ColoredAvatar>
          {companyName}
        </div>
      </div>
    </div>
  );
};
