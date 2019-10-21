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
import { updateAccountType } from "../store/actions/selectedAccountInfo";

import checkIc from "../assets/icons/check.png";
import { accountsNames } from "../constants";

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
  rootCellName: {
    maxWidth: "180px",
    paddingLeft: "5px",
    paddingRight: "0",
    "@media only screen and (max-width: 991px)": {
      width: "75%"
    }
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    transition: "left .25s ease",
    "@media only screen and (max-height: 900px)": {
      height: "calc(100% + 30px)"
    },
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#fff"
  },
  containedButton: {
    boxShadow: "none",
    backgroundColor: "#fff",
    height: "auto",
    border: "1px solid #373737",
    padding: "3px 0",
    width: "120px",
    fontFamily: "Open Sans",
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

const shortNames = {
  starter: {
    name: accountsNames.starter,
    ref: "RAKstarter"
  },
  currentAccount: {
    name: accountsNames.currentAccount,
    ref: "CurrentAccount"
  },
  elite: {
    name: accountsNames.elite,
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
    info: "RAKvalue Package (PLUS and MAX)",
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
      fontFamily: "Open Sans"
    },
    "& td": {
      height: "60px",
      padding: "0",
      position: "relative",
      fontSize: "16px",
      fontFamily: "Open Sans"
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
    fontFamily: "Open Sans",
    fontWeight: "600",
    height: "60px",
    padding: 0,
    borderBottom: "none",
    width: "190px",
    maxWidth: "190px",
    "@media only screen and (max-width: 1360px)": {
      width: "150px"
    }
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
    }
  }
}))(TableCell);

class TableCompare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 380,
      selectedAccountContainerWidth: "190px",
      selectedAccount: accountsNames.currentAccount
    };

    this.RAKstarter = React.createRef();
    this.CurrentAccount = React.createRef();
    this.RAKElite = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selectedAccount } = nextProps;
    this.handleHighlightSelectedAccount(selectedAccount);
  }

  updateDimensionSelectedAccountContainer = () => {
    const selectedAccountContainerWidth = window
      .getComputedStyle(this.RAKstarter.current)
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
    if (selectedAccount === this.state.selectedAccount) {
      return;
    }

    switch (selectedAccount) {
      case accountsNames.starter:
        this.setState({
          offset: this.RAKstarter.current.offsetLeft + 5,
          selectedCurrentColumn: 2
        });
        break;
      case accountsNames.currentAccount:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft + 5,
          selectedCurrentColumn: 3
        });
        break;
      case accountsNames.elite:
        this.setState({
          offset: this.RAKElite.current.offsetLeft + 5,
          selectedCurrentColumn: 4
        });
        break;
      default:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft + 5,
          selectedCurrentColumn: 2
        });
    }
  };

  handleSelectAccount = accountType => {
    const { history, updateProspect, updateAccountType } = this.props;
    updateAccountType(accountType);
    updateProspect({ "prospect.applicationInfo.accountType": accountType });
    history.push("/DetailedAccount");
  };

  handleHover = e => {
    const { currentTarget } = e;
    const { name } = currentTarget.dataset;
    this.handleHighlightSelectedAccount(name);
  };

  render() {
    const { classes } = this.props;
    const { offset } = this.state;

    const TableWithStyles = withStyles(() => ({
      root: {
        tableLayout: "fixed",
        width: "780px",
        maxWidth: "780px",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
        margin: "40px 0 30px 0",
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
            top: "-1px"
          }
        },
        "& tr:nth-of-type(even) td": {
          "&:before": {
            bottom: "0px"
          }
        },
        "& tr:nth-of-type(odd) td": {
          "&:before": {
            bottom: "0px"
          }
        },
        "& th:last-child, & td:last-child": {
          paddingRight: "0"
        },
        /* style for current selected account */
        [`& tr>:nth-child(${this.state.selectedCurrentColumn})`]: {
          fontWeight: "bold",
          "& span:first-child": {
            fontWeight: "600"
          },
          "& span:last-child": {
            fontWeight: "400"
          },
          "& button": {
            width: "150px",
            height: "40px",
            backgroundColor: "#000",
            "& span:first-child": {
              color: "#fff",
              fontSize: "16px"
            }
          }
        }
      }
    }))(Table);

    const StyledTableHeaderWitHoverHandler = ({ name, text }) => (
      <StyledTableHeader data-name={name} onMouseEnter={this.handleHover}>
        {text}
      </StyledTableHeader>
    );

    const StyledTableCellWitHoverHandler = ({ name, account: { text, info, ic }, ...props }) => (
      <StyledTableCell data-name={name} {...props} onMouseEnter={this.handleHover}>
        <span>{text}</span>
        <span>{info}</span>
        {ic && <img src={ic} alt="" />}
      </StyledTableCell>
    );

    return (
      <Paper classes={{ root: classes.paperRoot }}>
        <div>
          <div className={classes.tableContainer}>
            <Paper
              classes={{ root: classes.selectedAccountContainer }}
              style={{ left: `${offset}px`, width: this.state.selectedAccountContainerWidth }}
            />
            <TableWithStyles
              classes={{ root: classes.tableRoot }}
              currentcolumn={this.state.selectedCurrentColumn}
            >
              <TableHead style={{ position: "relative" }}>
                <TableRow classes={{ head: classes.tableHead }}>
                  <StyledTableHeader> </StyledTableHeader>
                  <StyledTableHeaderWitHoverHandler
                    text="RAKstarter"
                    name={accountsNames.starter}
                  />
                  <StyledTableHeaderWitHoverHandler
                    text="Current Account"
                    name={accountsNames.currentAccount}
                  />
                  <StyledTableHeaderWitHoverHandler text="RAKelite" name={accountsNames.elite} />
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

                      <StyledTableCellWitHoverHandler
                        name={accountsNames.starter}
                        account={starter}
                      />
                      <StyledTableCellWitHoverHandler
                        name={accountsNames.currentAccount}
                        account={currentAccount}
                      />
                      <StyledTableCellWitHoverHandler name={accountsNames.elite} account={elite} />
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
            </TableWithStyles>
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
  updateProspect,
  updateAccountType
};

export default withRouter(
  withStyles(style)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TableCompare)
  )
);
