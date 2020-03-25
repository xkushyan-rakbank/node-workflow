import React from "react";
import cx from "classnames";
import TableCell from "@material-ui/core/TableCell";
import { useStyles } from "./styled";

export const StyledTableHeaderCellWitHoverHandlerComponent = ({
  name,
  text,
  order,
  selectedCurrentColumn,
  handleHover
}) => {
  const classes = useStyles();

  return (
    <TableCell
      data-name={name}
      data-order={order}
      onMouseEnter={handleHover}
      classes={{ root: classes.tableHeaderCellRoot, head: classes.tableHeaderCellHead }}
      className={cx({ [classes.tableHeaderCellActive]: order === selectedCurrentColumn })}
    >
      {text}
    </TableCell>
  );
};
