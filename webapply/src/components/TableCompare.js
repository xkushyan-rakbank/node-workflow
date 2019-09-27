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

import checkIc from "../assets/icons/check.png";

const style = {
  paperRoot: {
    marginTop: "5px",
    boxSizing: "border-box",
    boxShadow: "none",
    position: "relative"
  },
  tableContainer: {
    minWidth: "780px",
    position: "relative",
    "@media only screen and (max-height: 900px)": {
      maxHeight: "368px"
    }
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
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    "@media only screen and (max-height: 900px)": {
      height: "calc(100% + 133px)"
    },
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    border: "solid 1px #e8e8e8"
  },
  containedButton: {
    boxShadow: "none",
    backgroundColor: "#fff",
    height: "auto",
    border: "1px solid #373737",
    padding: "3px 0",
    width: "120px",
    "&:hover": {
      backgroundColor: "#000",
      "& span": {
        color: "#fff"
      }
    }
  },
  containedButtonLabelStyle: {
    color: "#373737",
    fontSize: "14px",
    textAlign: "center",
    display: "block"
  }
};

const createData = (name, starter, currentAccount, elite) => {
  return { name, starter, currentAccount, elite };
};

const mockDataRows = [
  createData(
    "Monthly Average Credit Balance",
    { text: "Zero" },
    { text: "AED 25,0000", info: "or equivalent at entity level" },
    { text: "AED 500,000", info: "or equivalent at entity level" }
  ),
  createData(
    "Monthly charges for not maintaining average balance",
    { text: "Zero" },
    { text: "AED 50" },
    { text: "AED 250" }
  ),
  createData("Monthly Maintenance fees", { text: "AED 99" }, { text: "AED 50" }, { text: "Zero" }),
  createData("Free Teller Transactions", { text: "-" }, { text: "-" }, { ic: checkIc }),
  createData("Lifestyle benefits", { text: "-" }, { text: "-" }, { ic: checkIc }),
  createData(
    "RAKvalue Package(PLUS and MAX)",
    { text: "Mandatory", info: "(PLUS - AED 49)" },
    { text: "Optional" },
    { text: "Optional" }
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
    "& span": {
      display: "block"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888"
    },
    "& button": {
      marginTop: "5px"
    },
    "&:hover": {
      "& button": {
        width: "145px",
        padding: "7px 0"
      }
    }
  }
}))(TableCell);

class TableCompare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 380
    };

    this.RAKStarter = React.createRef();
    this.CurrentAccount = React.createRef();
    this.RAKElite = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedAccount } = nextProps;
    switch (selectedAccount) {
      case "RAKstarter":
        this.setState({
          offset: this.RAKStarter.current.offsetLeft
        });
        break;
      case "Current Account":
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft
        });
        break;
      case "RAKelite":
        this.setState({
          offset: this.RAKElite.current.offsetLeft
        });
        break;
      default:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft
        });
    }
  }

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
    const { offset } = this.state;

    return (
      <Paper classes={{ root: classes.paperRoot }}>
        <div style={{ overflowX: "auto" }}>
          <div className={classes.tableContainer} style={{}}>
            <Paper
              classes={{ root: classes.selectedAccountContainer }}
              style={{
                left: `${offset}px`,
                width: this.state.width - 5 || "195px"
              }}
            />
            <Table classes={{ root: classes.tableRoot }}>
              <TableHead style={{ position: "relative" }}>
                <TableRow classes={{ head: classes.tableHead }}>
                  <StyledTableHeader style={{ width: 180 }}> </StyledTableHeader>
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
                    <StyledTableCell>
                      <span>{row.starter.text}</span>
                      <span>{row.starter.info}</span>
                      {row.starter.ic && <img src={row.starter.ic} alt="" />}
                    </StyledTableCell>
                    <StyledTableCell>
                      <span>{row.currentAccount.text}</span>
                      <span>{row.currentAccount.info}</span>
                      {row.currentAccount.ic && <img src={row.currentAccount.ic} alt="" />}
                    </StyledTableCell>
                    <StyledTableCell>
                      <span>{row.elite.text}</span>
                      <span>{row.elite.info}</span>
                      {row.elite.ic && <img src={row.elite.ic} alt="" />}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}

                <StyledTableRow>
                  <TableCell component="th" scope="row">
                    {" "}
                  </TableCell>
                  <StyledTableCell ref={this.RAKStarter}>
                    <ContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("RAKStarter")}
                      classes={{
                        buttonStyle: classes.containedButton,
                        labelStyle: classes.containedButtonLabelStyle
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell ref={this.CurrentAccount}>
                    <ContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("Current Account")}
                      classes={{
                        buttonStyle: classes.containedButton,
                        labelStyle: classes.containedButtonLabelStyle
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell ref={this.RAKElite}>
                    <ContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("RAKelite")}
                      classes={{
                        buttonStyle: classes.containedButton,
                        labelStyle: classes.containedButtonLabelStyle
                      }}
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
