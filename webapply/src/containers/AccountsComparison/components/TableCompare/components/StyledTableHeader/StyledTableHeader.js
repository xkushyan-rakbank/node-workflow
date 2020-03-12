import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { StyledTableHeaderCellWitHoverHandler } from "../StyledTableHeaderCellWitHoverHandler";
import { useStyles } from "./styled";
import { accountTypes } from "../../constants";
import { accountNames, accountNamesShow } from "../../../../../../constants";

export const StyledTableHeaderComponent = ({ selectedCurrentColumn, handleHover }) => {
  const classes = useStyles();
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
          text={accountNamesShow.starter}
          name={accountTypes.starter.name}
          order={accountTypes.starter.position}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text={accountNames.currentAccount}
          name={accountTypes.currentAccount.name}
          order={accountTypes.currentAccount.position}
        />
        <StyledTableHeaderCellWitHoverHandler
          selectedCurrentColumn={selectedCurrentColumn}
          handleHover={handleHover}
          text={accountNamesShow.elite}
          name={accountTypes.elite.name}
          order={accountTypes.elite.position}
        />
      </TableRow>
    </TableHead>
  );
};
