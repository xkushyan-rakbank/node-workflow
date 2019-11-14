import React from "react";
import cx from "classnames";
import TableCell from "@material-ui/core/TableCell";
import { styles } from "./styled";

const StyledTableCellWitHoverHandler = ({
  name,
  account: { text, info, ic },
  order,
  handleHover,
  selectedCurrentColumn,
  ...props
}) => {
  const classes = styles();
  return (
    <TableCell
      data-name={name}
      {...props}
      onMouseEnter={handleHover}
      classes={{ root: classes.tableCellRoot }}
      className={cx({ [classes.tableCellActive]: order === selectedCurrentColumn })}
    >
      <span>{text}</span>
      <span>{info}</span>
      {ic && <img src={ic} alt="" />}
    </TableCell>
  );
};

export default StyledTableCellWitHoverHandler;
