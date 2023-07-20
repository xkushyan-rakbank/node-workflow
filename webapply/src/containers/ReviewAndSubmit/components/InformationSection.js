import React from "react";
import cx from "classnames";
import { useStyles } from "../styled";
import { ICONS, Icon } from "../../../components/Icons";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";

export const InformationSection = ({ title, children, showEditIcon = false, routeTo }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  return (
    <div className={classes.infoSection}>
      <div className={classes.infoSectionTitleWrapper}>
        <p className={classes.infoSectionTitle}>{title}</p>
        {showEditIcon && (
          <div
            className={cx(classes.iconWrapper, { [classes.disabledEditInfo]: !routeTo })}
            onClick={() => pushHistory(routeTo)}
          >
            <Icon name={ICONS.editIcon} className={classes.closeIcon} />
            <span>Edit</span>
          </div>
        )}
      </div>

      {title && <div className={classes.divider}></div>}
      <div className={classes.infoWrapper}>{children}</div>
    </div>
  );
};
