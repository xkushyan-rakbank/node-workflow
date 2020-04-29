import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";

import { StyledTableHeader } from "./components/StyledTableHeader";
import { StyledTableBody } from "./components/StyledTableBody";
import { StyledTableBodyMobile } from "./components/StyledTableBodyMobile";
import { updateProspect } from "../../../../store/actions/appConfig";
import { useWindowSize } from "../../../../utils/useWindowSize";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { CONVENTIONAL, detailedAccountRoutesMap } from "../../../../constants";
import { sizes, accountTypes } from "./constants";

import { useStyles } from "./styled";

const { INITIAL_OFFSET, OFFSET } = sizes;

export const TableCompareComponent = ({ selectedAccount }) => {
  const pushHistory = useTrackingHistory();
  const [offset, setOffset] = useState(INITIAL_OFFSET);
  const [selectedCurrentColumn, setSelectedCurrentColumn] = useState(null);
  const [width] = useWindowSize();
  const dispatch = useDispatch();
  const classes = useStyles();

  const RAKstarter = useRef(null);
  const CurrentAccount = useRef(null);
  const RAKElite = useRef(null);
  const refs = [RAKstarter, CurrentAccount, RAKElite];

  const handleHighlightSelectedAccount = useCallback(
    position => {
      const positionRefsMaps = {
        [accountTypes.starter.position]: RAKstarter,
        [accountTypes.currentAccount.position]: CurrentAccount,
        [accountTypes.elite.position]: RAKElite
      };
      const ref = positionRefsMaps[position];

      if (ref) {
        setOffset(ref.current.offsetLeft + OFFSET);
        setSelectedCurrentColumn(position);
      }
    },
    [setOffset, setSelectedCurrentColumn]
  );

  useEffect(() => {
    const timer = setTimeout(() => handleHighlightSelectedAccount(selectedCurrentColumn), 4);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, handleHighlightSelectedAccount]);

  useEffect(() => {
    const { position } = Object.values(accountTypes).find(item => item.name === selectedAccount);

    handleHighlightSelectedAccount(position);
  }, [selectedAccount, handleHighlightSelectedAccount]);

  const handleSelectAccount = useCallback(
    accountType => () => {
      dispatch(
        updateProspect({
          "prospect.applicationInfo.accountType": accountType
        })
      );
      setTimeout(() => {
        pushHistory(detailedAccountRoutesMap[accountType][CONVENTIONAL]);
      }, 4);
    },
    [dispatch, pushHistory]
  );

  const handleHover = e => {
    const { order } = e.currentTarget.dataset;

    handleHighlightSelectedAccount(parseInt(order, 10));
  };

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div>
        <div className={classes.tableContainer}>
          <Paper
            classes={{ root: classes.selectedAccountContainer }}
            style={{ left: `${offset}px` }}
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
            <StyledTableBodyMobile
              handleSelectAccount={handleSelectAccount}
              selectedAccount={selectedAccount}
            />
          </Table>
        </div>
      </div>
    </Paper>
  );
};
