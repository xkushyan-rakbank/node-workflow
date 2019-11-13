import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
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
import styled from "./styled";
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
    const { offset, selectedCurrentColumn, selectedAccountContainerWidth } = this.state;

    const StyledTableHeaderWitHoverHandler = ({ name, text, order }) => (
      <TableCell
        data-name={name}
        onMouseEnter={this.handleHover}
        classes={{ root: classes.tableHeaderCellRoot, head: classes.tableHeaderCellHead }}
        className={cx({ [classes.tableCellActive]: order === selectedCurrentColumn })}
      >
        {text}
      </TableCell>
    );

    const StyledTableCellWitHoverHandler = ({
      name,
      account: { text, info, ic },
      order,
      ...props
    }) => (
      <TableCell
        data-name={name}
        {...props}
        onMouseEnter={this.handleHover}
        classes={{ root: classes.tableCellRoot }}
        className={cx({ [classes.tableCellActive]: order === selectedCurrentColumn })}
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
              style={{ left: `${offset}px`, width: selectedAccountContainerWidth }}
            />
            <Table classes={{ root: classes.tableRoot }}>
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
                    order={2}
                  />
                  <StyledTableHeaderWitHoverHandler
                    text="Current Account"
                    name={accountsNames.currentAccount}
                    order={3}
                  />
                  <StyledTableHeaderWitHoverHandler
                    text="RAKelite"
                    name={accountsNames.elite}
                    order={4}
                  />
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
                        className={cx({ [classes.tableCellActive]: selectedCurrentColumn === 1 })}
                      >
                        {row.info}
                      </TableCell>

                      <StyledTableCellWitHoverHandler
                        name={accountsNames.starter}
                        account={starter}
                        index={index}
                        order={2}
                      />
                      <StyledTableCellWitHoverHandler
                        name={accountsNames.currentAccount}
                        account={currentAccount}
                        index={index}
                        order={3}
                      />
                      <StyledTableCellWitHoverHandler
                        order={4}
                        name={accountsNames.elite}
                        account={elite}
                      />
                    </TableRow>
                  );
                })}

                <TableRow classes={{ root: classes.tableRowRoot }}>
                  <TableCell component="th" scope="row" />
                  {Object.entries(shortNames).map(([type, value], index) => {
                    const { name, ref } = value;
                    return (
                      <TableCell
                        ref={this[ref]}
                        data-name={name}
                        onMouseEnter={this.handleHover}
                        key={index}
                        classes={{ root: classes.tableCellRoot }}
                        className={cx({
                          [classes.tableCellActive]: selectedCurrentColumn === index + 2
                        })}
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
  updateProspect,
  updateAccountType
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styled),
  withRouter
)(TableCompare);
