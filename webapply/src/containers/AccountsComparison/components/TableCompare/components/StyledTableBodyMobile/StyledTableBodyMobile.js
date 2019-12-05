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
  const [mobileAccount1, setMobileAccount1] = useState(accountTypes.starter.id);
  const [mobileAccount2, setMobileAccount2] = useState(accountTypes.currentAccount.id);
  return (
    <TableBody>
      <TableRow classes={{ root: classes.tableRowRoot }}>
        <TableCell classes={{ root: classes.tableCellRoot }} className={classes.tableCellSelect}>
          <Select
            value={mobileAccount1}
            onChange={e => setMobileAccount1(e.target.value)}
            input={<BootstrapInput />}
          >
            {Object.entries(accountTypes).map(([_, { id, name }], index) => {
              if (mobileAccount2 !== id) {
                return (
                  <MenuItem value={id} key={index}>
                    {name}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </TableCell>

        <TableCell classes={{ root: classes.tableCellRoot }} className={classes.tableCellSelect}>
          <Select
            value={mobileAccount2}
            onChange={e => setMobileAccount2(e.target.value)}
            input={<BootstrapInput />}
          >
            {Object.entries(accountTypes).map(([_, { id, name }], index) => {
              if (mobileAccount1 !== id) {
                return (
                  <MenuItem value={id} key={index}>
                    {name}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </TableCell>
      </TableRow>

      {accountsDataRows.map((accountsDataRow, index) => {
        return (
          <TableRow classes={{ root: classes.tableRowRoot }} key={index}>
            <StyledTableCellWitHoverHandler
              title={accountsDataRow.info}
              name={accountTypes.elite.name}
              account={accountsDataRow[mobileAccount1]}
            />

            <StyledTableCellWitHoverHandler
              title={accountsDataRow.info}
              name={accountTypes.elite.name}
              account={accountsDataRow[mobileAccount2]}
            />
          </TableRow>
        );
      })}

      <TableRow classes={{ root: classes.tableRowRoot }}>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <ContainedButton
            label="Read more"
            handleClick={() => handleSelectAccount(accountTypes[mobileAccount1].name)}
            classes={{
              buttonStyle: classes.containedButton,
              labelStyle: classes.containedButtonLabelStyle
            }}
          />
        </TableCell>

        <TableCell classes={{ root: classes.tableCellRoot }}>
          <ContainedButton
            label="Read more"
            handleClick={() => handleSelectAccount(accountTypes[mobileAccount2].name)}
            classes={{
              buttonStyle: classes.containedButton,
              labelStyle: classes.containedButtonLabelStyle
            }}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
