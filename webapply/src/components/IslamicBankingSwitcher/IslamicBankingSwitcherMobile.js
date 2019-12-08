import React from "react";
import { styled } from "@material-ui/core/styles";

import IslamicBankingSwitcher from "./IslamicBankingSwitcher";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrowDown.svg";

const ButtonToggler = styled("button")({
  position: "absolute",
  backgroundColor: "transparent",
  top: 16,
  right: 16,
  border: 0,
  padding: 0,
  zIndex: 10,
  cursor: "pointer",
  transition: "all .3s",
  transform: props => (props.isSwitcherShow ? "rotate(180deg)" : "rotate(0deg)"),
  "& svg": {
    verticalAlign: "top"
  },
  "& path": {
    fill: "#fff"
  },
  "&:focus": {
    outline: "none"
  }
});

const SwitcherWrapper = styled("div")({
  position: "absolute",
  opacity: props => (props.isSwitcherShow ? 1 : 0),
  pointerEvents: props => (props.isSwitcherShow ? "auto" : "none"),
  zIndex: 2,
  backgroundColor: "transparent",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  padding: "70px 16px 0",
  border: 0,
  cursor: "pointer",
  transition: "all .3s"
});

export const ArrowDownIcon = styled(ArrowDown)({
  width: "32px",
  height: "32px"
});

const IslamicBankingSwitcherMobile = ({
  children,
  className,
  isSwitcherShow,
  toggleSwitcherShow
}) => {
  return (
    <div className="show-on-mobile">
      <ButtonToggler onClick={toggleSwitcherShow} isSwitcherShow={isSwitcherShow}>
        <ArrowDownIcon />
      </ButtonToggler>
      <SwitcherWrapper className={className} isSwitcherShow={isSwitcherShow}>
        {children}
        <IslamicBankingSwitcher />
      </SwitcherWrapper>
    </div>
  );
};

export default IslamicBankingSwitcherMobile;
