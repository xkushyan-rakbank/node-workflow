import React from "react";
import {
  TableContainer,
  Table,
  //TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@material-ui/core";
import { useStyles } from "./styled";

export const TableComponent = ({ data, datalist }) => {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader className={classes.table} aria-label="Search results table">
          <TableBody>
            {datalist.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.displayText}</TableCell>
                <TableCell align="center">{data.includes(item.value) ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
