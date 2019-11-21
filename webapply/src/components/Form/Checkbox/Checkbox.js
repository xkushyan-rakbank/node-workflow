import React from "react";
import cx from "classnames";
import { styled } from "@material-ui/styles";
import HelpTooltip from "../../HelpTooltip";
import { ReactComponent as CheckIcon } from "../../../assets/icons/on.svg";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info.svg";
import { useStyles } from "./styled";

export const StyledCheckIcon = styled(CheckIcon)({
  position: "absolute",
  top: "-2px",
  left: "-2px",
  bottom: "0"
});

export const StyledInfoIcon = styled(InfoIcon)({
  width: "16px",
  height: "16px",
  marginRight: "5px"
});

export const Checkbox = ({
  disabled,
  placeholder,
  label,
  field,
  infoTitle,
  form: { errors, touched, setFieldValue },
  withQuestion,
  config = {},
  name,
  callback,
  tooltipMessage,
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
              checked={field.value}
              className={classes.hiddenCheckbox}
              disabled={disabled}
              onChange={() => {
                setFieldValue(field.name, !field.value);
                if (callback) {
                  callback();
                }
              }}
            />
            <div className={classes.styledCheckbox}>
              {field.value && <StyledCheckIcon alt="check icon" />}
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

        {withQuestion && <HelpTooltip message={tooltipMessage} />}
      </div>
      {config.title && (
        <div className={classes.secondRow}>
          <StyledInfoIcon alt="info" />
          {config && config.title}
        </div>
      )}
    </div>
  );
};
