import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";

import ContainerComeBack from "../ComeBack/ContainerComeBack";
import AddButton from "../../components/Buttons/AddButton";
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
  },
  addNewApp: {
    marginTop: 40
  }
};

const ButtonWithIcon = ({ Icon, typeView, selectedView, handleClick }) => {
  return (
    <button
      className={cx({ selected: selectedView === typeView })}
      onClick={() => handleClick(typeView)}
    >
      <Icon style={{ color: selectedView === typeView ? "#fff" : "#ccc" }} />
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
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Typography classes={{ root: classes.rootTitle }} variant="h5">
            My applications
          </Typography>
          <Box classes={{ root: classes.rootChangeViewContainer }}>
            <ButtonWithIcon
              Icon={ListIcon}
              typeView="list"
              selectedView={selectedView}
              handleClick={this.handleChangeView}
            />
            <ButtonWithIcon
              Icon={AppsIcon}
              typeView="grid"
              selectedView={selectedView}
              handleClick={this.handleChangeView}
            />
          </Box>
        </Grid>

        <Grid container direction="column">
          <AddButton title="New application" className={classes.addNewApp} />
          {selectedView === "list" ? (
            <MyApplicationsList
              currentApplications={mockDataMyCurrentApplication}
            />
          ) : (
            <MyApplicationsGrid
              currentApplications={mockDataMyCurrentApplication}
            />
          )}
        </Grid>
      </ContainerComeBack>
    );
  }
}

export default withStyles(styles)(MyApplications);
