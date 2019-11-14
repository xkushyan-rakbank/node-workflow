import React from "react";
import cx from "classnames";
import TableCell from "@material-ui/core/TableCell";
import { styles } from "./styled";

const StyledTableHeaderCellWitHoverHandler = ({
  name,
  text,
  order,
  selectedCurrentColumn,
  handleHover
}) => {
  const classes = styles();
  return (
    <TableCell
      data-name={name}
      onMouseEnter={handleHover}
      classes={{ root: classes.tableHeaderCellRoot, head: classes.tableHeaderCellHead }}
      className={cx({ [classes.tableHeaderCellActive]: order === selectedCurrentColumn })}
    >
      {text}
    </TableCell>
  );
};

export default StyledTableHeaderCellWitHoverHandler;
