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
    "@media only screen and (max-height: 920px)": {
      maxHeight: "480px"
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
      height: "calc(100% + 30px)"
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
    { text: "AED 25,000", info: "or equivalent at entity level" },
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selectedAccount } = nextProps;
    this.handleHighlightSelectedAccount(selectedAccount);
  }

  handleHighlightSelectedAccount = selectedAccount => {
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
  };

  handleClick = accountType => {
    const { history, updateProspect } = this.props;
    updateProspect({
      value: accountType,
      name: "prospect.applicationInfo.accountType"
    });
    history.push("/DetailedAccount");
  };

  handleScroll = e => {
    const { currentTarget } = e;
    // const hasHorizontalScrollbar = currentTarget.scrollWidth < 780;
    const hasVerticalScrollbar = currentTarget.scrollHeight < 540;
    if (hasVerticalScrollbar) {
      e.stopPropagation();
    }
  };

  handleHover = e => {
    const { currentTarget } = e;
    this.handleHighlightSelectedAccount(currentTarget.dataset.name);
  };

  render() {
    const { classes } = this.props;
    const { offset } = this.state;

    const StyledTableHeaderWitHoverHandler = ({ name, text }) => (
      <StyledTableHeader data-name={name} onMouseEnter={this.handleHover}>
        {text}
      </StyledTableHeader>
    );

    const StyledTableCellWitHoverHandler = ({ name, ...props }) => (
      <StyledTableCell data-name={name} {...props} onMouseEnter={this.handleHover}>
        {props.children}
      </StyledTableCell>
    );

    return (
      <Paper classes={{ root: classes.paperRoot }} onWheel={this.handleScroll}>
        <div style={{ overflowX: "auto" }}>
          <div className={classes.tableContainer}>
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
                  <StyledTableHeaderWitHoverHandler name="RAKstarter" text="RAKStarter" />
                  <StyledTableHeaderWitHoverHandler name="Current Account" text="Current Account" />
                  <StyledTableHeaderWitHoverHandler name="RAKelite" text="RAKelite" />
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

                    <StyledTableCellWitHoverHandler name="RAKstarter">
                      <span>{row.starter.text}</span>
                      <span>{row.starter.info}</span>
                      {row.starter.ic && <img src={row.starter.ic} alt="" />}
                    </StyledTableCellWitHoverHandler>

                    <StyledTableCellWitHoverHandler name="Current Account">
                      <span>{row.currentAccount.text}</span>
                      <span>{row.currentAccount.info}</span>
                      {row.currentAccount.ic && <img src={row.currentAccount.ic} alt="" />}
                    </StyledTableCellWitHoverHandler>

                    <StyledTableCellWitHoverHandler name="RAKelite">
                      <span>{row.elite.text}</span>
                      <span>{row.elite.info}</span>
                      {row.elite.ic && <img src={row.elite.ic} alt="" />}
                    </StyledTableCellWitHoverHandler>
                  </StyledTableRow>
                ))}

                <StyledTableRow>
                  <TableCell component="th" scope="row">
                    {" "}
                  </TableCell>

                  <StyledTableCell
                    ref={this.RAKStarter}
                    data-name="RAKstarter"
                    onMouseEnter={this.handleHover}
                  >
                    <ContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("RAKStarter")}
                      classes={{
                        buttonStyle: classes.containedButton,
                        labelStyle: classes.containedButtonLabelStyle
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    ref={this.CurrentAccount}
                    data-name="Current Account"
                    onMouseEnter={this.handleHover}
                  >
                    <ContainedButton
                      label="Read more"
                      handleClick={() => this.handleClick("Current Account")}
                      classes={{
                        buttonStyle: classes.containedButton,
                        labelStyle: classes.containedButtonLabelStyle
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    ref={this.RAKElite}
                    data-name="RAKelite"
                    onMouseEnter={this.handleHover}
                  >
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
