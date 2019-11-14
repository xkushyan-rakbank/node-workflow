import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import StyledTableHeaderCellWitHoverHandler from "../StyledTableHeaderCellWitHoverHandler";
import { styles } from "./styled";
import { accountsNames } from "../../../../../../constants";

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
          name={accountsNames.starter}
          order={2}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text="Current Account"
          name={accountsNames.currentAccount}
          order={3}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text="RAKelite"
          name={accountsNames.elite}
          order={4}
        />
      </TableRow>
    </TableHead>
  );
};

export default StyledTableHeader;
