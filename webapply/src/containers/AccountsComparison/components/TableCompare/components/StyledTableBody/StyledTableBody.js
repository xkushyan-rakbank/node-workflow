import React from "react";
import cx from "classnames";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { ContainedButton } from "../../../../../../components/Buttons/ContainedButton";
import { StyledTableCellWitHoverHandler } from "../StyledTableCellWitHoverHandler";
import { useStyles } from "./styled";
import { accountsDataRows, accountTypes } from "../../constants";
import { FIRST_ROW_POSITION, TABLE_POSITION_OFFSET } from "./constants";

export const StyledTableBodyComponent = ({
  selectedCurrentColumn,
  handleSelectAccount,
  handleHover,
  refs
}) => {
  const classes = useStyles();
  return (
    <TableBody>
      {accountsDataRows.map(({ starter, currentAccount, elite, info }, index) => {
        return (
          <TableRow classes={{ root: classes.tableRowRoot }} key={index}>
            <TableCell
              classes={{ root: classes.rootCellName }}
              align="right"
              component="th"
              scope="row"
              className={cx({
                [classes.tableCellActive]: selectedCurrentColumn === FIRST_ROW_POSITION
              })}
            >
              {info[0]}
              <br />
              {info[1]}
            </TableCell>

            <StyledTableCellWitHoverHandler
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              name={accountTypes.starter.name}
              account={starter}
              order={accountTypes.starter.position}
            />
            <StyledTableCellWitHoverHandler
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              name={accountTypes.currentAccount.name}
              account={currentAccount}
              order={accountTypes.currentAccount.position}
            />
            <StyledTableCellWitHoverHandler
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              name={accountTypes.elite.name}
              account={elite}
              order={accountTypes.elite.position}
            />
          </TableRow>
        );
      })}

      <TableRow classes={{ root: classes.tableRowRoot }}>
        <TableCell component="th" scope="row" />
        {Object.entries(accountTypes).map(([_, { name }], index) => (
          <TableCell
            ref={refs[index]}
            data-name={name}
            onMouseEnter={handleHover}
            key={index}
            classes={{ root: classes.tableCellRoot }}
            className={cx({
              [classes.tableCellActive]: selectedCurrentColumn === index + TABLE_POSITION_OFFSET
            })}
          >
            <ContainedButton
              label="Read more"
              handleClick={() => handleSelectAccount(name)}
              classes={{
                buttonStyle: classes.containedButton,
                labelStyle: classes.containedButtonLabelStyle
              }}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};
