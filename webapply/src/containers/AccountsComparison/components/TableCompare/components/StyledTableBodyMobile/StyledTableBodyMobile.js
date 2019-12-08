import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ContainedButton } from "../../../../../../components/Buttons/ContainedButton";
import { StyledTableCellWitHoverHandler } from "../StyledTableCellWitHoverHandler";
import { useStyles } from "./styled";
import { accountsDataRows, accountTypes } from "../../constants";

const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 4,
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    width: "100%",
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #e8e8e8",
    fontSize: 14,
    textAlign: "left",
    padding: "13px 26px 13px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      backgroundColor: "#fff"
    }
  }
}))(InputBase);

export const StyledTableBodyMobileComponent = ({ handleSelectAccount }) => {
  const classes = useStyles();
  const [mobileAccounts, setMobileAccounts] = useState([
    accountTypes.starter.id,
    accountTypes.currentAccount.id
  ]);

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
            <ContainedButton
              label="Read more"
              handleClick={() => handleSelectAccount(accountTypes[mobileAccount].name)}
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
