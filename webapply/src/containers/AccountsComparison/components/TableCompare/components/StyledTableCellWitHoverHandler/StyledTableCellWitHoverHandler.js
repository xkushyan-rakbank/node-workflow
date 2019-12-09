import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { useStyles } from "./styled";

export const StyledTableCellWitHoverHandlerComponent = ({
  title,
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
    >
      <span>{text}</span>
      <span>{info}</span>
      {ic && <img src={ic} alt="" />}
      <div>{title}</div>
    </TableCell>
  );
};
