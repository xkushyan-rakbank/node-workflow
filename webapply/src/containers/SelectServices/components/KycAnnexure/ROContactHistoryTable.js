import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableHead
} from "@material-ui/core";
import { useStyles } from "./styled";

export const ROContactHistoryTable = ({ datalist }) => {
  const classes = useStyles();
  datalist = datalist ?? [{ kycVerificationDate: "-", roName: "-", kycVerificationTime: "" }];
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader className={classes.table} aria-label="RO contact history table">
          <TableHead>
            <TableRow>
              <TableCell align="center" class={classes.historyTableHeader}>
                Contacted Date
              </TableCell>
              <TableCell align="center" class={classes.historyTableHeader}>
                Contacted Person
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datalist?.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {`${item?.kycVerificationDate} ${item?.kycVerificationTime}`}
                </TableCell>
                <TableCell align="center"> {item?.roName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
