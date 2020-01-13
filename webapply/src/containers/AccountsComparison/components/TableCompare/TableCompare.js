import React, { useState, useRef, useEffect, useCallback } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import { StyledTableHeader } from "./components/StyledTableHeader";
import { StyledTableBody } from "./components/StyledTableBody";
import { StyledTableBodyMobile } from "./components/StyledTableBodyMobile";
import { sizes, accountTypes } from "./constants";
import { useStyles } from "./styled";
import routes from "../../../../routes";

export const TableCompareComponent = ({ history, updateAccountType, selectedAccount }) => {
  const { INITIAL_OFFSET, SELECTED_ELEM_WIDTH, OFFSET } = sizes;
  const [offset, setOffset] = useState(INITIAL_OFFSET);
  const [selectedAccountContainerWidth, setSelectedAccountContainerWidth] = useState(
    SELECTED_ELEM_WIDTH
  );
  const [activeAccount, setActiveAccount] = useState(accountTypes.currentAccount.position);
  const [selectedCurrentColumn, setSelectedCurrentColumn] = useState(null);
  const classes = useStyles();

  const RAKstarter = useRef(null);
  const CurrentAccount = useRef(null);
  const RAKElite = useRef(null);
  const refs = [RAKstarter, CurrentAccount, RAKElite];
  const highlightSelectedAccount = useCallback(handleHighlightSelectedAccount, [selectedAccount]);

  useEffect(() => {
    const updateDimensionSelectedAccountContainer = () => {
      const accountContainerWidth = RAKstarter.current.clientWidth - OFFSET * 2;
      setSelectedAccountContainerWidth(accountContainerWidth);
    };
    updateDimensionSelectedAccountContainer();
    return () => {
      window.removeEventListener("resize", updateDimensionSelectedAccountContainer);
    };
  }, [OFFSET]);

  useEffect(() => {
    highlightSelectedAccount(selectedAccount);
  }, [selectedAccount, highlightSelectedAccount]);

  function handleHighlightSelectedAccount(account) {
    if (account === activeAccount) {
      return;
    }

    switch (account) {
      case accountTypes.starter.name:
        setOffset(RAKstarter.current.offsetLeft + OFFSET);
        setActiveAccount(account);
        setSelectedCurrentColumn(accountTypes.starter.position);
        break;
      case accountTypes.currentAccount.name:
        setOffset(CurrentAccount.current.offsetLeft + OFFSET);
        setActiveAccount(account);
        setSelectedCurrentColumn(accountTypes.currentAccount.position);
        break;
      case accountTypes.elite.name:
        setOffset(RAKElite.current.offsetLeft + OFFSET);
        setActiveAccount(account);
        setSelectedCurrentColumn(accountTypes.elite.position);
        break;
      default:
        setOffset(CurrentAccount.current.offsetLeft + OFFSET);
        setActiveAccount(account);
        setSelectedCurrentColumn(accountTypes.currentAccount.position);
    }
  }

  const handleSelectAccount = accountType => {
    updateAccountType(accountType);
    history.push(routes.detailedAccount);
  };

  const handleHover = e => {
    const { currentTarget } = e;
    const { name } = currentTarget.dataset;
    handleHighlightSelectedAccount(name);
  };

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div>
        <div className={classes.tableContainer}>
          <Paper
            classes={{ root: classes.selectedAccountContainer }}
            style={{ left: `${offset}px`, width: selectedAccountContainerWidth }}
          />
          <Table classes={{ root: classes.tableRoot }}>
            <StyledTableHeader
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
            />
            <StyledTableBody
              selectedCurrentColumn={selectedCurrentColumn}
              handleHover={handleHover}
              handleSelectAccount={handleSelectAccount}
              refs={refs}
            />
          </Table>
        </div>
        <div className={classes.tableMobileContainer}>
          <Table classes={{ root: classes.tableRoot }}>
            <StyledTableBodyMobile handleSelectAccount={handleSelectAccount} />
          </Table>
        </div>
      </div>
    </Paper>
  );
};
