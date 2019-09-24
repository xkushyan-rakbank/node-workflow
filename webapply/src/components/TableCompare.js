import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ContainedButton from "./Buttons/ContainedButton";
import { connect } from "react-redux";
import * as appConfigSelectors from "../store/selectors/appConfig";
import { updateProspect } from "../store/actions/appConfig";

const style = {
  paperRoot: {
    marginTop: "5px",
    boxSizing: "border-box",
    boxShadow: "none",
    position: "relative"
  },
  tableHead: {
    backgroundColor: "#f7f8f9"
  },
  tableRoot: {
    tableLayout: "fixed",
    width: "auto",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    margin: "30px 0",
    "& th, & td": {
      borderBottom: "none",
      zIndex: "1"
    },
    "& tr:not(:last-child) td": {
      "&::before": {
        content: "''",
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        height: "2px",
        backgroundColor: "#f7f8f9"
      }
    },
    "& tr:nth-of-type(even) td": {
      "&::before": {
        bottom: 2
      }
    },
    "& tr:nth-of-type(odd) td": {
      "&::before": {
        bottom: -2
      }
    },
    "& th:last-child, & td:last-child": {
      paddingRight: 0
    }
  },
  rootCellName: {
    maxWidth: "180px",
    paddingLeft: "5px",
    paddingRight: "0"
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

const StyledTableRow = withStyles(() => ({
  root: {
    "& th": {
      fontSize: "14px",
      color: "#888888",
      padding: "0 5px 0 0px"
    },
    "& td": {
      height: "60px",
      padding: "0",
      position: "relative"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f7f8f9"
    }
  }
}))(TableRow);

const StyledTableHeader = withStyles(() => ({
  root: {
    position: "relative",
    textAlign: "center"
  },
  head: {
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

const StyledTableCell = withStyles(() => ({
  root: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    "& button": {
      marginTop: "20px"
    },
    "&:hover": {
      "& button": {
        width: "145px",
        padding: "7px 0"
      }
    }
  }
}))(TableCell);

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
        backgroundColor: "#000",
        "& span": {
          color: "#fff"
        }
      }
    },
    labelStyle: {
      color: "#373737",
      fontSize: "14px",
      textAlign: "center",
      display: "block"
    }
  }))(ContainedButton);

  return <Button {...props} />;
};

const SelectedAccountContainer = ({ offset, width }) => {
  return (
    <Paper
      style={{
        position: "absolute",
        zIndex: "1",
        left: `${offset}px`,
        width: width - 5 || "195px",
        top: "-15px",
        height: "calc(100% + 30px)",
        borderRadius: "8px",
        boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
        border: "solid 1px #e8e8e8"
      }}
    />
  );
};

class TableCompare extends React.Component {
  state = {
    offset: 380
  };

  onHoverSection = e => {
    if (e.target.tagName === "TD") {
      const { offsetLeft, clientWidth } = e.target;
      this.setState({
        offset: offsetLeft,
        width: clientWidth
      });
    }
  };

  handleClick = accountType => {
    const { history, updateProspect } = this.props;
    updateProspect({
      value: accountType,
      name: "prospect.applicationInfo.accountType"
    });
    history.push("/DetailedAccount");
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper classes={{ root: classes.paperRoot }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "780px", position: "relative" }}>
            <SelectedAccountContainer
              offset={this.state.offset}
              width={this.state.width}
            />
            <Table classes={{ root: classes.tableRoot }}>
              <TableHead style={{ position: "relative" }}>
                <TableRow classes={{ head: classes.tableHead }}>
                  <StyledTableHeader style={{ width: 180 }}>
                    {" "}
                  </StyledTableHeader>
                  <StyledTableHeader>RAKStarter</StyledTableHeader>
                  <StyledTableHeader>Current Account</StyledTableHeader>
                  <StyledTableHeader>RAKelite</StyledTableHeader>
                </TableRow>
              </TableHead>

              <TableBody>
                {mockDataRows.map(row => (
                  <StyledTableRow key={row.name}>
                    <TableCell
                      classes={{ root: classes.rootCellName }}
                      align="right"
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <StyledTableCell>{row.starter}</StyledTableCell>
                    <StyledTableCell>{row.currentAccount}</StyledTableCell>
                    <StyledTableCell>{row.elite}</StyledTableCell>
                  </StyledTableRow>
                ))}

                <StyledTableRow>
                  <TableCell component="th" scope="row">
                    {" "}
                  </TableCell>
                  <StyledTableCell onMouseEnter={this.onHoverSection}>
                    <StyledContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("RAKStarter")}
                    />
                  </StyledTableCell>
                  <StyledTableCell onMouseEnter={this.onHoverSection}>
                    <StyledContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("Current Account")}
                    />
                  </StyledTableCell>
                  <StyledTableCell onMouseEnter={this.onHoverSection}>
                    <StyledContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("RAKelite")}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withRouter(
  withStyles(style)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TableCompare)
  )
);
