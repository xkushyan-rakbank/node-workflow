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
import { portraitOrientationQueryIPads } from "../constants/styles";

const style = {
  paperRoot: {
    marginTop: "5px",
    boxSizing: "border-box",
    boxShadow: "none",
    position: "relative"
  },
  tableContainer: {
    position: "relative"
  },
  tableHead: {
    backgroundColor: "#f7f8f9"
  },
  tableRoot: {
    tableLayout: "fixed",
    width: "100%",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    margin: "30px 0",
    "&.mobileTable": {
      display: "none"
    },
    "@media only screen and (max-width: 1100px)": {
      display: "none",
      margin: "0",
      "& + &": {
        marginTop: "20px"
      },
      "&.mobileTable": {
        display: "block"
      }
    },
    "& th, & td": {
      borderBottom: "none",
      zIndex: "1"
    },
    "& tr:not(:last-child) td": {
      "&:before": {
        content: "''",
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        height: "2px",
        backgroundColor: "#f7f8f9",
        display: "block",
        top: "-2px"
      }
    },
    "& tr:nth-of-type(even) td": {
      "&:before": {
        bottom: "2px"
      }
    },
    "& tr:nth-of-type(odd) td": {
      "&:before": {
        bottom: "-2px"
      }
    },
    "& th:last-child, & td:last-child": {
      paddingRight: "0",
      "@media only screen and (max-width: 1100px)": {
        padding: "0"
      }
    }
  },
  rootCellName: {
    maxWidth: "180px",
    paddingLeft: "5px",
    paddingRight: "0",
    "@media only screen and (max-width: 1100px)": {
      maxWidth: "inherit",
      width: "50%"
    },
    "@media only screen and (max-width: 991px)": {
      width: "75%"
    }
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    "@media only screen and (max-width: 1100px)": {
      display: "none"
    },
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
    display: "block",
    "@media only screen and (max-width: 1100px)": {
      lineHeight: "1"
    }
  },
  mobileTable: {
    display: "none"
  }
};

const shortNames = {
  starter: {
    name: "RAKStarter",
    ref: "RAKStarter"
  },
  currentAccount: {
    name: "Current Account",
    ref: "CurrentAccount"
  },
  elite: {
    name: "RAKelite",
    ref: "RAKElite"
  }
};
const mockDataRows = [
  {
    info: "Monthly Average Credit Balance",
    starter: { text: "Zero" },
    currentAccount: { text: "AED 25,000", info: "or equivalent at entity level" },
    elite: { text: "AED 500,000", info: "or equivalent at entity level" }
  },
  {
    info: "Monthly charges for not maintaining average balance",
    starter: { text: "Zero" },
    currentAccount: { text: "AED 50" },
    elite: { text: "AED 250" }
  },
  {
    info: "Monthly Maintenance fees",
    starter: { text: "AED 99" },
    currentAccount: { text: "AED 50" },
    elite: { text: "Zero" }
  },
  {
    info: "Free Teller Transactions",
    starter: { text: "-" },
    currentAccount: { text: "-" },
    elite: { ic: checkIc }
  },
  {
    info: "Lifestyle benefits",
    starter: { text: "-" },
    currentAccount: { text: "-" },
    elite: { ic: checkIc }
  },
  {
    info: "RAKvalue Package(PLUS and MAX)",
    starter: { text: "Mandatory", info: "(PLUS - AED 49)" },
    currentAccount: { text: "Optional" },
    elite: { text: "Optional" }
  }
];

const StyledTableRow = withStyles(() => ({
  root: {
    "& th": {
      fontSize: "14px",
      color: "#888888",
      padding: "0 5px 0 0",
      "@media only screen and (max-width: 1100px)": {
        fontSize: "12px"
      }
    },
    "& td": {
      height: "60px",
      padding: "0",
      position: "relative",
      "@media only screen and (max-width: 1360px)": {
        width: "150px"
      },
      "@media only screen and (max-width: 1100px)": {
        height: "auto"
      }
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f7f8f9"
    },
    "@media only screen and (max-width: 1100px)": {
      "&:nth-of-type(even)": {
        backgroundColor: "#fff"
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#f7f8f9"
      }
    }
  }
}))(TableRow);

const StyledTableHeader = withStyles(() => ({
  root: {
    position: "relative",
    textAlign: "center",
    color: "red"
  },
  head: {
    color: "#373737",
    fontSize: "16px",
    fontWeight: "600",
    height: "60px",
    padding: 0,
    borderBottom: "none",
    width: "200px",
    maxWidth: "200px",
    "@media only screen and (max-width: 1360px)": {
      width: "150px"
    },
    "@media only screen and (max-width: 1100px)": {
      height: "auto",
      fontSize: "14px"
    }
  }
}))(TableCell);

const StyledTableCell = withStyles(() => ({
  root: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    "@media only screen and (max-width: 1100px)": {
      fontSize: "12px"
    },
    "& span": {
      display: "block"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888",
      "@media only screen and (max-width: 1360px)": {
        fontSize: "10px"
      }
    },
    "& button": {
      marginTop: "5px"
    },
    "&:hover": {
      "& button": {
        width: "145px",
        padding: "7px 0",
        "@media only screen and (max-width: 1100px)": {
          padding: "3px 0"
        },
        [portraitOrientationQueryIPads]: {
          width: "120px"
        }
      }
    }
  }
}))(TableCell);

class TableCompare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 380,
      selectedAccountContainerWidth: "190px",
      selectedAccount: ""
    };

    this.RAKStarter = React.createRef();
    this.CurrentAccount = React.createRef();
    this.RAKElite = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selectedAccount } = nextProps;
    this.handleHighlightSelectedAccount(selectedAccount);
  }

  updateDimensionSelectedAccountContainer = () => {
    const selectedAccountContainerWidth = window
      .getComputedStyle(this.RAKStarter.current)
      .getPropertyValue("width");
    this.setState({
      selectedAccountContainerWidth: parseInt(selectedAccountContainerWidth) - 10
    });

    this.handleHighlightSelectedAccount(this.state.selectedAccount);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensionSelectedAccountContainer);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensionSelectedAccountContainer);
    this.updateDimensionSelectedAccountContainer();
  }

  handleHighlightSelectedAccount = selectedAccount => {
    switch (selectedAccount) {
      case shortNames.starter.name:
        this.setState({
          offset: this.RAKStarter.current.offsetLeft + 5
        });
        break;
      case shortNames.currentAccount.name:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft + 5
        });
        break;
      case shortNames.elite.name:
        this.setState({
          offset: this.RAKElite.current.offsetLeft + 5
        });
        break;
      default:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft + 5
        });
    }
  };

  handleSelectAccount = accountType => {
    const { history, updateProspect } = this.props;
    updateProspect({ "prospect.applicationInfo.accountType": accountType });
    history.push("/DetailedAccount");
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
      <Paper classes={{ root: classes.paperRoot }}>
        <div>
          <div className={classes.tableContainer}>
            <Paper
              classes={{ root: classes.selectedAccountContainer }}
              style={{
                left: `${offset}px`,
                width: this.state.selectedAccountContainerWidth
              }}
            />
            <Table classes={{ root: classes.tableRoot }}>
              <TableHead style={{ position: "relative" }}>
                <TableRow classes={{ head: classes.tableHead }}>
                  <StyledTableHeader style={{ width: 180 }}> </StyledTableHeader>
                  <StyledTableHeaderWitHoverHandler
                    name={shortNames.starter.name}
                    text="RAKStarter"
                  />
                  <StyledTableHeaderWitHoverHandler
                    name={shortNames.currentAccount.name}
                    text="Current Account"
                  />
                  <StyledTableHeaderWitHoverHandler name={shortNames.elite.name} text="RAKelite" />
                </TableRow>
              </TableHead>

              <TableBody>
                {mockDataRows.map((row, index) => {
                  const { starter, currentAccount, elite } = row;
                  return (
                    <StyledTableRow key={index}>
                      <TableCell
                        classes={{ root: classes.rootCellName }}
                        align="right"
                        component="th"
                        scope="row"
                      >
                        {row.info}
                      </TableCell>

                      <StyledTableCellWitHoverHandler name={shortNames.starter.name}>
                        <span>{starter.text}</span>
                        <span>{starter.info}</span>
                        {starter.ic && <img src={starter.ic} alt="" />}
                      </StyledTableCellWitHoverHandler>

                      <StyledTableCellWitHoverHandler name={shortNames.currentAccount.name}>
                        <span>{currentAccount.text}</span>
                        <span>{currentAccount.info}</span>
                        {currentAccount.ic && <img src={currentAccount.ic} alt="" />}
                      </StyledTableCellWitHoverHandler>

                      <StyledTableCellWitHoverHandler name={shortNames.elite.name}>
                        <span>{elite.text}</span>
                        <span>{elite.info}</span>
                        {elite.ic && <img src={elite.ic} alt="" />}
                      </StyledTableCellWitHoverHandler>
                    </StyledTableRow>
                  );
                })}

                <StyledTableRow>
                  <TableCell component="th" scope="row" />

                  {Object.keys(shortNames).map((shortName, index) => {
                    const { name, ref } = shortNames[shortName];
                    return (
                      <StyledTableCell
                        ref={this[ref]}
                        data-name={name}
                        onMouseEnter={this.handleHover}
                        key={index}
                      >
                        <ContainedButton
                          label="Read more"
                          handleClick={() => this.handleSelectAccount(name)}
                          classes={{
                            buttonStyle: classes.containedButton,
                            labelStyle: classes.containedButtonLabelStyle
                          }}
                        />
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              </TableBody>
            </Table>

            {/* Table for small width */}
            {Object.keys(shortNames).map((typeAccount, index) => {
              const { name } = shortNames[typeAccount];
              return (
                <Table classes={{ root: classes.tableRoot }} className={"mobileTable"} key={index}>
                  <TableHead style={{ position: "relative" }}>
                    <TableRow classes={{ head: classes.tableHead }}>
                      <StyledTableHeader style={{ width: 180 }}> </StyledTableHeader>
                      <StyledTableHeaderWitHoverHandler name={typeAccount} text={name} />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {mockDataRows.map((row, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <TableCell
                            classes={{ root: classes.rootCellName }}
                            align="right"
                            component="th"
                            scope="row"
                          >
                            {row.info}
                          </TableCell>
                          <StyledTableCellWitHoverHandler name={name}>
                            <span>{row[typeAccount].text}</span>
                            <span>{row[typeAccount].info}</span>
                            {row[typeAccount].ic && <img src={row[typeAccount].ic} alt="" />}
                          </StyledTableCellWitHoverHandler>
                        </StyledTableRow>
                      );
                    })}
                    <StyledTableRow>
                      <StyledTableCell />

                      <StyledTableCell data-name={name} onMouseEnter={this.handleHover} key={index}>
                        <ContainedButton
                          label="Read more"
                          handleClick={() => this.handleSelectAccount(name)}
                          classes={{
                            buttonStyle: classes.containedButton,
                            labelStyle: classes.containedButtonLabelStyle
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              );
            })}
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
