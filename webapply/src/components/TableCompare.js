import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ContainedButton from "./Buttons/ContainedButton";

const style = {
  head: {
    backgroundColor: "#eff2f4",
    color: "#000"
  },
  root: {
    marginTop: "20px",
    boxSizing: "border-box",
    boxShadow: "none",
    "&:nth-of-type(odd)": {
      backgroundColor: "red"
    }
  },
  table: {
    tableLayout: "fixed",
    width: "auto",
    borderRadius: "8px",
    overflow: "hidden",
    "& th, & td": {
      borderBottom: "none"
    }
  },
  body: {
    maxWidth: "180px",
    paddingLeft: "5px",
    paddingRight: "0"
  },
  contentCeil: {
    fontSize: "16px",
    color: "#373737",
    "& button": {
      marginTop: "20px"
    }
  },
  foo: {
    backgroundColor: "green"
  },
  boo: {
    color: "red"
  }
};

const createData = (name, starter, currentAccount, elite) => {
  return { name, starter, currentAccount, elite };
};

const mockDataRows = [
  createData(
    "Minumum monthly  credit balance",
    "Zero",
    "AED 25,000",
    "AED 500,000"
  ),
  createData(
    "Montly charges for not maintaining balance",
    "Zero",
    "AED 50",
    "AED 250"
  ),
  createData("Monthly account maintenance fees", "AED 99", "AED 50", "Zero"),
  createData("A free chequebook every year", 305, 3.7, 67),
  createData("Lifestyle benefits", 356, 16.0, 49),
  createData(
    "RAKvalue Package(PLUS and MAX)",
    "Mandatory",
    "Optional",
    "Optional"
  )
];

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#f7f8f9",
    color: "#373737",
    fontSize: "16px",
    fontWeight: "600",
    height: "60px",
    padding: 0,
    borderBottom: "none",
    width: "200px",
    maxWidth: "200px"
  }
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    "& th": {
      fontSize: "14px",
      color: "#888888",
      padding: "0 5px 0 0px"
    },
    "& td": {
      height: "60px",
      padding: "0px 0px 0px 0px"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f7f8f9"
    }
  }
}))(TableRow);

const StyledContainedButton = props => {
  const Button = withStyles(() => ({
    buttonStyle: {
      boxShadow: "none",
      backgroundColor: "#fff",
      height: "auto",
      border: "1px solid #373737",
      padding: "3px 0",
      width: props.width || "120px",
      "&:hover": {
        backgroundColor: "#000"
      }
    },
    labelStyle: {
      color: "#373737",
      fontSize: "14px",
      textAlign: "center",
      display: "block",
      "&:hover": {
        color: "#fff"
      }
    }
  }))(ContainedButton);

  return <Button {...props} />;
};

class TableCompare extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 180 }} align="center">
                {" "}
              </StyledTableCell>
              <StyledTableCell align="center">RAKstarter</StyledTableCell>
              <StyledTableCell align="center">Current Account</StyledTableCell>
              <StyledTableCell align="center">RAKelite</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mockDataRows.map(row => (
              <StyledTableRow key={row.name}>
                <TableCell
                  className={classes.body}
                  align="right"
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.contentCeil} align="center">
                  {row.starter}
                </TableCell>
                <TableCell className={classes.contentCeil} align="center">
                  {row.currentAccount}
                </TableCell>
                <TableCell className={classes.contentCeil} align="center">
                  {row.elite}
                </TableCell>
              </StyledTableRow>
            ))}

            <StyledTableRow>
              <TableCell
                className={classes.body}
                align="right"
                component="th"
                scope="row"
              >
                {" "}
              </TableCell>
              <TableCell className={classes.contentCeil} align="center">
                <StyledContainedButton label="Read more" />
              </TableCell>
              <TableCell className={classes.contentCeil} align="center">
                <StyledContainedButton label="Read more" />
              </TableCell>
              <TableCell className={classes.contentCeil} align="center">
                <StyledContainedButton label="Read more" />
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(style)(TableCompare);
