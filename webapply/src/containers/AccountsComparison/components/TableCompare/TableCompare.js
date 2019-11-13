import React, { useState, useRef, useEffect, useCallback } from "react";
import cx from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ContainedButton from "../../../../components/Buttons/ContainedButton";
import { accountsNames } from "../../../../constants/index";
import { shortNames, mockDataRows, initialValue } from "./constants";
import routes from "../../../../routes";

const TableCompare = ({ history, updateProspect, updateAccountType, classes, selectedAccount }) => {
  const [offset, setOffset] = useState(initialValue.offset);
  const [selectedAccountContainerWidth, setSelectedAccountContainerWidth] = useState(
    initialValue.selectedAccountContainerWidth
  );
  const [activeAccount, setActiveAccount] = useState(2);
  const [selectedCurrentColumn, setSelectedCurrentColumn] = useState(null);

  const RAKstarter = useRef(null);
  const CurrentAccount = useRef(null);
  const RAKElite = useRef(null);
  const refs = [RAKstarter, CurrentAccount, RAKElite];
  const highlightSelectedAccount = useCallback(handleHighlightSelectedAccount, [selectedAccount]);

  useEffect(() => {
    const updateDimensionSelectedAccountContainer = () => {
      const selectedAccountContainerWidth = window
        .getComputedStyle(RAKstarter.current)
        .getPropertyValue("width");
      setSelectedAccountContainerWidth(parseInt(selectedAccountContainerWidth) - 10);
    };
    updateDimensionSelectedAccountContainer();
    return () => {
      window.removeEventListener("resize", updateDimensionSelectedAccountContainer);
    };
  }, []);

  useEffect(() => {
    highlightSelectedAccount(selectedAccount);
  }, [selectedAccount, highlightSelectedAccount]);

  function handleHighlightSelectedAccount(account) {
    if (account === activeAccount) {
      return;
    }

    switch (account) {
      case accountsNames.starter:
        setOffset(RAKstarter.current.offsetLeft + 5);
        setActiveAccount(account);
        setSelectedCurrentColumn(2);
        break;
      case accountsNames.currentAccount:
        setOffset(CurrentAccount.current.offsetLeft + 5);
        setActiveAccount(account);
        setSelectedCurrentColumn(3);
        break;
      case accountsNames.elite:
        setOffset(RAKElite.current.offsetLeft + 5);
        setActiveAccount(account);
        setSelectedCurrentColumn(4);
        break;
      default:
        setOffset(CurrentAccount.current.offsetLeft + 5);
        setActiveAccount(account);
        setSelectedCurrentColumn(2);
    }
  }

  const handleSelectAccount = accountType => {
    updateAccountType(accountType);
    updateProspect({ "prospect.applicationInfo.accountType": accountType });
    history.push(routes.detailedAccount);
  };

  const handleHover = e => {
    const { currentTarget } = e;
    const { name } = currentTarget.dataset;
    handleHighlightSelectedAccount(name);
  };

  const StyledTableHeaderWitHoverHandler = ({ name, text, order }) => (
    <TableCell
      data-name={name}
      onMouseEnter={handleHover}
      classes={{ root: classes.tableHeaderCellRoot, head: classes.tableHeaderCellHead }}
      className={cx({ [classes.tableCellActive]: order === selectedCurrentColumn })}
    >
      {text}
    </TableCell>
  );

  const StyledTableCellWitHoverHandler = ({
    name,
    account: { text, info, ic },
    order,
    ...props
  }) => (
    <TableCell
      data-name={name}
      {...props}
      onMouseEnter={handleHover}
      classes={{ root: classes.tableCellRoot }}
      className={cx({ [classes.tableCellActive]: order === selectedCurrentColumn })}
    >
      <span>{text}</span>
      <span>{info}</span>
      {ic && <img src={ic} alt="" />}
    </TableCell>
  );

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div>
        <div className={classes.tableContainer}>
          <Paper
            classes={{ root: classes.selectedAccountContainer }}
            style={{ left: `${offset}px`, width: selectedAccountContainerWidth }}
          />
          <Table classes={{ root: classes.tableRoot }}>
            <TableHead classes={{ root: classes.relative }}>
              <TableRow classes={{ head: classes.tableHead }}>
                <TableCell
                  classes={{
                    root: classes.tableHeaderCellRoot,
                    head: classes.tableHeaderCellHead
                  }}
                />
                <StyledTableHeaderWitHoverHandler
                  text="RAKstarter"
                  name={accountsNames.starter}
                  order={2}
                />
                <StyledTableHeaderWitHoverHandler
                  text="Current Account"
                  name={accountsNames.currentAccount}
                  order={3}
                />
                <StyledTableHeaderWitHoverHandler
                  text="RAKelite"
                  name={accountsNames.elite}
                  order={4}
                />
              </TableRow>
            </TableHead>

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
                      name={accountsNames.starter}
                      account={starter}
                      index={index}
                      order={2}
                    />
                    <StyledTableCellWitHoverHandler
                      name={accountsNames.currentAccount}
                      account={currentAccount}
                      index={index}
                      order={3}
                    />
                    <StyledTableCellWitHoverHandler
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
          </Table>
        </div>
      </div>
    </Paper>
  );
};

export default TableCompare;
