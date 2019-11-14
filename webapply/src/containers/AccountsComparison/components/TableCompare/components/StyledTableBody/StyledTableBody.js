import React from "react";
import cx from "classnames";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ContainedButton from "../../../../../../components/Buttons/ContainedButton";
import StyledTableCellWitHoverHandler from "../StyledTableCellWitHoverHandler";
import { styles } from "./styled";
import { accountsNames } from "../../../../../../constants";
import { mockDataRows, shortNames } from "../../constants";

const StyledTableBody = ({ selectedCurrentColumn, handleSelectAccount, handleHover, refs }) => {
  const classes = styles();
  return (
    <TableBody>
      {mockDataRows.map((row, index) => {
        const { starter, currentAccount, elite } = row;
        return (
          <TableRow classes={{ root: classes.tableRowRoot }} key={index}>
            <TableCell
              classes={{ root: classes.rootCellName }}
              align="right"
              component="th"
              scope="row"
              className={cx({ [classes.tableCellActive]: selectedCurrentColumn === 1 })}
            >
              {row.info}
            </TableCell>

            <StyledTableCellWitHoverHandler
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              name={accountsNames.starter}
              account={starter}
              index={index}
              order={2}
            />
            <StyledTableCellWitHoverHandler
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              name={accountsNames.currentAccount}
              account={currentAccount}
              index={index}
              order={3}
            />
            <StyledTableCellWitHoverHandler
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              order={4}
              name={accountsNames.elite}
              account={elite}
            />
          </TableRow>
        );
      })}

      <TableRow classes={{ root: classes.tableRowRoot }}>
        <TableCell component="th" scope="row" />
        {Object.entries(shortNames).map(([type, value], index) => {
          const { name } = value;
          return (
            <TableCell
              ref={refs[index]}
              data-name={name}
              onMouseEnter={handleHover}
              key={index}
              classes={{ root: classes.tableCellRoot }}
              className={cx({
                [classes.tableCellActive]: selectedCurrentColumn === index + 2
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
          );
        })}
      </TableRow>
    </TableBody>
  );
};

export default StyledTableBody;
