import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import list_ic from "../../assets/icons/list_white_ic.svg";
import list_gray_ic from "../../assets/icons/list_gray_ic.svg";
import grid_ic from "../../assets/icons/grid_grey_ic.svg";
import grid_white_ic from "../../assets/icons/grid_white_ic.svg";

import ContainerComeBack from "../ComeBack/ContainerComeBack";
import { mockDataMyCurrentApplication } from "../../agent/MyApplications";
import MyApplicationsList from "../../agent/MyApplicationsList";
import MyApplicationsGrid from "../../agent/MyApplicationsGrid";

const styles = {
  rootTitle: {
    color: "#373737",
    fontWeight: "600",
    lineHeight: "1.33"
  },
  rootChangeViewContainer: {
    backgroundColor: "#fff",
    boxShadow: "0 5px 12px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "& button": {
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "5px",
      width: 32,
      height: 32,
      padding: 0,
      "&.selected": {
        backgroundColor: "#000"
      },
      "&:hover": {
        cursor: "pointer"
      }
    }
  }
};

const ButtonWithIcon = ({ icon, iconSelected, typeView, selectedView, handleClick }) => {
  const isSelected = selectedView === typeView;
  return (
    <button className={cx({ selected: isSelected })} onClick={() => handleClick(typeView)}>
      <img src={isSelected ? icon : iconSelected} alt="type view" />
    </button>
  );
};

class MyApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: "list"
    };
  }

  handleChangeView = view => {
    this.setState({ selectedView: view });
  };

  render() {
    const { classes } = this.props;
    const { selectedView } = this.state;

    return (
      <ContainerComeBack>
        <Grid container direction="row" alignItems="center" justify="space-between">
          <Typography classes={{ root: classes.rootTitle }} variant="h5">
            My applications
          </Typography>
          <Box classes={{ root: classes.rootChangeViewContainer }}>
            <ButtonWithIcon
              icon={list_ic}
              iconSelected={list_gray_ic}
              typeView="list"
              selectedView={selectedView}
              handleClick={this.handleChangeView}
            />
            <ButtonWithIcon
              icon={grid_white_ic}
              iconSelected={grid_ic}
              typeView="grid"
              selectedView={selectedView}
              handleClick={this.handleChangeView}
            />
          </Box>
        </Grid>

        <Grid container direction="column">
          {selectedView === "list" ? (
            <MyApplicationsList currentApplications={mockDataMyCurrentApplication} />
          ) : (
            <MyApplicationsGrid currentApplications={mockDataMyCurrentApplication} />
          )}
        </Grid>
      </ContainerComeBack>
    );
  }
}

export default withStyles(styles)(MyApplications);
