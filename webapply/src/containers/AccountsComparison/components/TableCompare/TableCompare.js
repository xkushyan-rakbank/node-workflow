import React, { useState, useRef, useEffect, useCallback } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import StyledTableHeader from "./components/StyledTableHeader";
import StyledTableBody from "./components/StyledTableBody";
import { accountsNames } from "../../../../constants/index";
import { initialValue } from "./constants";
import { styles } from "./styled";
import routes from "../../../../routes";

const TableCompare = ({ history, updateProspect, updateAccountType, selectedAccount }) => {
  const [offset, setOffset] = useState(initialValue.offset);
  const [selectedAccountContainerWidth, setSelectedAccountContainerWidth] = useState(
    initialValue.selectedAccountContainerWidth
  );
  const [activeAccount, setActiveAccount] = useState(2);
  const [selectedCurrentColumn, setSelectedCurrentColumn] = useState(null);
  const classes = styles();

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
      </div>
    </Paper>
  );
};

export default TableCompare;
