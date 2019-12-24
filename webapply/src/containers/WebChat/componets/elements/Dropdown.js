import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import styled from "styled-components";
import angleDown from "../../../../assets/webchat/angle_down.svg";

import { FormItem } from "./FormItem";
import { Backdrop } from "./Backdrop";

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const FormItemSelect = styled(FormItem)`
  ${props => props.isOpen && { zIndex: 10, position: "relative" }};
  &:after {
    content: "";
    ${props =>
      props.isOpen && {
        position: "absolute",
        left: "-5px",
        right: "-5px",
        top: "-10px",
        bottom: "-10px",
        borderRadius: "4px",
        zIndex: "-1",
        backgroundColor: "#fff"
      }};
  }
  img {
    pointer-events: none;
    position: absolute;
    right: 0;
    top: calc(50% - 12px);
    width: 24px;
    height: 24px;
    margin-top: -3px;
    transition: all 0.2s;
    transform: rotate(${props => (props.isOpen ? "180deg" : "0")});
  }
  input {
    padding-top: 9px;
    height: 31px;
  }
`;

const customStyles = (isError, overwriteStyle) => {
  return {
    control: provided => ({
      ...provided,
      border: 0,
      boxShadow: "none",
      minHeight: "32px"
    }),
    indicatorsContainer: () => ({
      display: "none"
    }),
    valueContainer: provided => ({
      ...provided,
      padding: "0",
      borderBottom: `1px solid ${isError ? "#ec2d1b)" : "#e9e9ed"}`
    }),
    input: provided => ({
      ...provided,
      padding: "0",
      margin: "0",
      input: {
        padding: "9px 0 6px 0!important",
        margin: "0",
        fontSize: "14px!important",
        lineHeight: "16px",
        boxSizing: "border-box!important"
      }
    }),
    placeholder: provided => ({
      ...provided,
      padding: "9px 0 6px 0",
      margin: "0",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#707070"
    }),
    singleValue: provided => ({
      ...provided,
      padding: "9px 0 6px 0",
      margin: "0",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#373737"
    }),
    menu: provided => ({
      ...provided,
      left: "-5px",
      right: "-5px",
      top: "calc(100% + 11px)",
      margin: "10px 0",
      width: "calc(100% + 10px)",
      background: "#fff",
      minWidth: "200px",
      border: "0",
      borderRadius: "8px",
      overflow: "hidden"
    }),
    menuList: provided => ({
      ...provided,
      padding: "0"
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px 16px",
      color: "#373737",
      backgroundColor: state.isSelected ? "#e9e9ed" : "transparent",
      cursor: !state.isSelected ? "pointer" : "default",
      transition: "all .2s",
      "&:hover, &:focus": {
        backgroundColor: !state.isSelected ? "#fcfaf6" : "#e9e9ed"
      },
      "&:not(:last-child)": {
        borderBottom: "1px solid #e9e9ed"
      },
      "&:first-child": {
        borderRadius: "8px 8px 0 0"
      },
      "&:last-child": {
        borderRadius: "0 0 8px 8px"
      }
    }),
    group: provided => ({
      ...provided,
      padding: 0,
      "&:not(:last-child)": {
        borderBottom: "1px solid #e9e9ed"
      }
    }),
    groupHeading: provided => ({
      ...provided,
      padding: "0 16px",
      borderBottom: "1px solid #e9e9ed",
      margin: 0
    }),
    ...overwriteStyle
  };
};

const Dropdown = ({ className, label, error, card, overwriteStyle, value, disabled, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
      <FormItemSelect
        className={className}
        label={label}
        error={error}
        suffix={!disabled && <img src={angleDown} alt="" />}
        isOpen={isOpen}
        active
        value={value}
        disabled={disabled}
      >
        <ReactSelect
          styles={customStyles(card, error, overwriteStyle)}
          value={value}
          {...props}
          menuIsOpen={isOpen}
          onMenuClose={() => setIsOpen(false)}
          onMenuOpen={() => setIsOpen(true)}
        />
      </FormItemSelect>
    </Container>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  suffix: PropTypes.any,
  card: PropTypes.bool,
  isSearchable: PropTypes.bool,
  overwriteStyle: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

Dropdown.defaultProps = {
  isSearchable: false
};

export { Dropdown };
