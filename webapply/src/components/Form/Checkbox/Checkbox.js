import React from "react";
import cx from "classnames";
import HelpTooltip from "../../HelpTooltip";
import Check from "../../../assets/icons/on.svg";
import infoIc from "../../../assets/icons/info.svg";
import { useStyles } from "./styled";

export const Checkbox = ({
  disabled,
  placeholder,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  withQuestion,
  config,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.labelWrapper}>
        <label className={classes.checkboxWrapper}>
          <div className={classes.checkboxContainer}>
            <input
              {...props}
              {...field}
              type="checkbox"
              checked={field.checked}
              className={classes.hiddenCheckbox}
              disabled={disabled}
            />
            <div className={classes.styledCheckbox}>
              {field.value && <img src={Check} alt="check icon" />}
            </div>
          </div>
          {config && config.title ? (
            <div className={classes.doubleLabel}>
              <div className={cx(classes.firstRow, { disabled })}>{config.label}</div>
            </div>
          ) : (
            <span className={classes.label}>{label || config.label}</span>
          )}
        </label>

        {withQuestion && (
          <HelpTooltip
            message={
              "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
          />
        )}
      </div>
      {config && config.title && (
        <div className={classes.secondRow}>
          <img src={infoIc} alt="info" />
          {config && config.title}
        </div>
      )}
    </div>
  );
};
