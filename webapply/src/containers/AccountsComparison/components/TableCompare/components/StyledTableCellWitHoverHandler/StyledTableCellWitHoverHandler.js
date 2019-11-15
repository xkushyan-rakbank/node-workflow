import React from "react";
import cx from "classnames";
import TableCell from "@material-ui/core/TableCell";
import { useStyles } from "./styled";

export const StyledTableCellWitHoverHandlerComponent = ({
  name,
  account: { text, info, ic },
  order,
  handleHover,
  selectedCurrentColumn,
  ...props
}) => {
  const classes = useStyles();
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
