import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import isPlainObject from "lodash/isPlainObject";

const Wrapper = styled.div`
  position: relative;
  transition: all 0.2s;
  padding-top: "15px";
`;

const labelStyle = {
  default: {
    fontSize: "16px",
    fontWeight: "600",
    top: "10px",
    opacity: "0.5"
  },
  active: {
    fontSize: "10px",
    fontWeight: "normal",
    top: "-6px"
  }
};

const Label = styled.label`
  position: absolute;
  left: 0;
  line-height: 16px;
  z-index: 1;
  transition: all 0.2s;
  color: var(--light-gray);
  pointer-events: none;
  ${props => (props.active ? labelStyle.active : labelStyle.default)};
`;

const Suffix = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-grey);
  font-size: 12px;
  line-height: 18px;
  svg {
    width: 18px;
    height: 18px;
    vertical-align: top;
    color: var(--dark-grey);
  }
`;

const Error = styled.div`
  color: var(--tomato);
  font-size: 10px;
  line-height: 14px;
  position: absolute;
  left: 0;
  top: calc(100% + 2px);
`;

const FormItemStyled = styled.div`
  ${Wrapper} {
    transform: ${props =>
      !!props.error && props.error.length > 0 ? "translateY(-6px)" : "translateY(0)"};
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const FormItemDisabled = styled(FormItemStyled)`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  font-size: 14px;
  line-height: 16px;
  > div {
    padding: 14px 0 2px;
    min-height: 32px;
  }
  label {
    color: var(--silver);
  }
`;

const FormItem = ({
  children,
  className,
  label,
  active,
  error,
  count,
  suffix,
  radio,
  disabled,
  value,
  ...props
}) => {
  if (disabled) {
    return (
      <FormItemDisabled className={className} suffix={suffix} {...props}>
        <Wrapper>
          {!!label && <Label active>{label}</Label>}
          {value}
          {!!suffix && <Suffix>{suffix}</Suffix>}
        </Wrapper>
      </FormItemDisabled>
    );
  } else {
    return (
      <FormItemStyled className={className} suffix={suffix} error={error} {...props}>
        <Wrapper withLabel={radio && label}>
          {!!label && <Label active={active || (radio && label)}>{label}</Label>}
          {children}
          {!!suffix && <Suffix>{suffix}</Suffix>}
          {!!error && (
            <Error>{isPlainObject(error) ? Object.values(error).join("\n") : error}</Error>
          )}
        </Wrapper>
      </FormItemStyled>
    );
  }
};

FormItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  label: PropTypes.string,
  /** Pass true in case with active label state. */
  active: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
  suffix: PropTypes.any,
  radio: PropTypes.bool
};

export { FormItem };
