import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import StyledTableHeaderCellWitHoverHandler from "../StyledTableHeaderCellWitHoverHandler";
import { styles } from "./styled";
import { accountTypes } from "../../constants";

const StyledTableHeader = ({ selectedCurrentColumn, handleHover }) => {
  const classes = styles();
  return (
    <TableHead classes={{ root: classes.relative }}>
      <TableRow classes={{ head: classes.tableHead }}>
        <TableCell
          classes={{
            root: classes.tableHeaderCellRoot,
            head: classes.tableHeaderCellHead
          }}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text="RAKstarter"
          name={accountTypes.starter.name}
          order={accountTypes.starter.position}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text="Current Account"
          name={accountTypes.currentAccount.name}
          order={accountTypes.currentAccount.position}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text="RAKelite"
          name={accountTypes.elite.name}
          order={accountTypes.elite.position}
        />
      </TableRow>
    </TableHead>
  );
};

export default StyledTableHeader;
