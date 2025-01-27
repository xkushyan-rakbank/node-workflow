import React, { useState, useEffect } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { LinkedButton } from "../../../../../../components/Buttons/LinkedButton";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { StyledTableCellWitHoverHandler } from "../StyledTableCellWitHoverHandler";
import { accountsDataRows, accountTypes } from "../../constants";
import { COMPARED_ACCOUNTS_TYPES } from "./constants";

import { useStyles, BootstrapInput } from "./styled";

export const StyledTableBodyMobileComponent = ({
  selectedAccount,
  handleSelectAccount,
  showPromptDialog,
  handleClose
}) => {
  const classes = useStyles();
  const [mobileAccounts, setMobileAccounts] = useState(COMPARED_ACCOUNTS_TYPES.starter);

  useEffect(() => {
    const accountTypeId = Object.values(accountTypes).find(value => value.name === selectedAccount)
      .id;
    setMobileAccounts(COMPARED_ACCOUNTS_TYPES[accountTypeId]);
  }, [selectedAccount, setMobileAccounts]);

  return (
    <TableBody>
      <TableRow classes={{ root: classes.tableRowRoot }}>
        {mobileAccounts.map((mobileAccount, index) => (
          <TableCell
            key={index}
            classes={{ root: classes.tableCellRoot }}
            className={classes.tableCellSelect}
          >
            <Select
              value={mobileAccount}
              onChange={e => {
                const newMobileAccounts = [...mobileAccounts];
                newMobileAccounts[index] = e.target.value;
                setMobileAccounts(newMobileAccounts);
              }}
              input={<BootstrapInput />}
            >
              {Object.entries(accountTypes).map(
                ([_, { id, name }]) =>
                  mobileAccounts[1 - index] !== id && (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  )
              )}
            </Select>
          </TableCell>
        ))}
      </TableRow>

      {accountsDataRows.map((accountsDataRow, index) => (
        <TableRow classes={{ root: classes.tableRowRoot }} key={index}>
          {mobileAccounts.map((mobileAccount, index) => (
            <StyledTableCellWitHoverHandler
              key={index}
              title={accountsDataRow.info}
              name={accountTypes.elite.name}
              account={accountsDataRow[mobileAccount]}
            />
          ))}
        </TableRow>
      ))}

      <TableRow classes={{ root: classes.tableRowRoot }}>
        {mobileAccounts.map((mobileAccount, index) => (
          <TableCell key={index} classes={{ root: classes.tableCellRoot }}>
            <LinkedButton
              label="Read more"
              onClick={handleSelectAccount(accountTypes[mobileAccount].accountName)}
            />
            <ContinueButton
              handleClick={() => showPromptDialog(accountTypes[mobileAccount].accountName)}
              label="Apply now"
              handleClose={handleClose}
              classes={{ buttonStyle: classes.continueButtonRoot }}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};
