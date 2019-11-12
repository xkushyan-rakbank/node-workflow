import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ContainedButton from "../Buttons/ContainedButton";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { updateProspect } from "../../store/actions/appConfig";
import { updateAccountType } from "../../store/actions/selectedAccountInfo";
import { accountsNames } from "../../constants/index";
import { shortNames, mockDataRows, initialValue } from "./constants";
import style from "./styled";
import routes from "../../routes";

class TableCompare extends React.Component {
  state = {
    offset: initialValue.offset,
    selectedAccountContainerWidth: initialValue.selectedAccountContainerWidth,
    selectedAccount: accountsNames.currentAccount
  };

  RAKstarter = React.createRef();
  CurrentAccount = React.createRef();
  RAKElite = React.createRef();

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
          selectedAccount,
          selectedCurrentColumn: 2
        });
        break;
      case accountsNames.currentAccount:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft + 5,
          selectedAccount,
          selectedCurrentColumn: 3
        });
        break;
      case accountsNames.elite:
        this.setState({
          offset: this.RAKElite.current.offsetLeft + 5,
          selectedAccount,
          selectedCurrentColumn: 4
        });
        break;
      default:
        this.setState({
          offset: this.CurrentAccount.current.offsetLeft + 5,
          selectedAccount,
          selectedCurrentColumn: 2
        });
    }
  };

  handleSelectAccount = accountType => {
    const { history, updateProspect, updateAccountType } = this.props;
    updateAccountType(accountType);
    updateProspect({ "prospect.applicationInfo.accountType": accountType });
    history.push(routes.detailedAccount);
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
      <TableCell
        data-name={name}
        onMouseEnter={this.handleHover}
        classes={{ root: classes.tableHeaderCellRoot, head: classes.tableHeaderCellHead }}
      >
        {text}
      </TableCell>
    );

    const StyledTableCellWitHoverHandler = ({ name, account: { text, info, ic }, ...props }) => (
      <TableCell
        data-name={name}
        {...props}
        onMouseEnter={this.handleHover}
        classes={{ root: classes.tableCellRoot }}
      >
        <span>{text}</span>
        <span>{info}</span>
        {ic && <img src={ic} alt="" />}
      </TableCell>
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
                  <TableCell
                    classes={{
                      root: classes.tableHeaderCellRoot,
                      head: classes.tableHeaderCellHead
                    }}
                  />
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
                    <TableRow classes={{ root: classes.tableRowRoot }} key={index}>
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
                    </TableRow>
                  );
                })}

                <TableRow classes={{ root: classes.tableRowRoot }}>
                  <TableCell component="th" scope="row" />

                  {Object.keys(shortNames).map((shortName, index) => {
                    const { name, ref } = shortNames[shortName];
                    return (
                      <TableCell
                        ref={this[ref]}
                        data-name={name}
                        onMouseEnter={this.handleHover}
                        key={index}
                        classes={{ root: classes.tableCellRoot }}
                      >
                        <ContainedButton
                          label="Read more"
                          handleClick={() => this.handleSelectAccount(name)}
                          classes={{
                            buttonStyle: classes.containedButton,
                            labelStyle: classes.containedButtonLabelStyle
                          }}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
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
