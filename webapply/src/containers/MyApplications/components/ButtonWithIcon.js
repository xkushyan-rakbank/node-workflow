import React from "react";
import cx from "classnames";

import { Icon } from "../../../components/Icons";

export const ButtonWithIcon = ({ icon, isSelected, handleClick }) => (
  <button className={cx({ selected: isSelected })} onClick={handleClick}>
    <Icon name={icon} />
  </button>
);
