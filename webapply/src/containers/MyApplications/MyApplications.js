import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import list_ic from "../../assets/icons/list_white_ic.png";
import list_gray_ic from "../../assets/icons/list_gray_ic.png";
import grid_ic from "../../assets/icons/grid_grey_ic.png";
import grid_white_ic from "../../assets/icons/grid_white_ic.png";

import ContainerComeBack from "../ComeBack/ContainerComeBack";
import MyApplicationsList from "../../agent/MyApplicationsList";
import MyApplicationsGrid from "../../agent/MyApplicationsGrid";

import { retrieveApplicantInfo } from "../../store/actions/retrieveApplicantInfo";
import { getApplicantInfo } from "../../store/selectors/retrieveApplicantInfo";
import { getEndpoints } from "../../store/selectors/appConfig";

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
  viewColumn: {
    flexDirection: "column",
    marginTop: "45px"
  },
  veiwRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridColumnGap: 20,
    gridRowGap: 20,
    marginTop: "45px"
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

  componentDidMount() {
    const inputParam = {
      fname: "abhishek",
      countryCode: "+971",
      mobileNo: "0123456789",
      leadNumber: "ABCD",
      tradeLicenseNo: "TL100",
      email: "abc@abc.com",
      eidNumber: ""
    };
    this.props.retrieveApplicantInfo(inputParam);

    // if (prevProps.endpoints !== this.props.endpoints) {
    //   this.props.retrieveApplicantInfo(inputParam);
    // }
  }

  handleChangeView = view => {
    this.setState({ selectedView: view });
  };

  render() {
    const { classes, searchResults } = this.props;
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

        <div className={selectedView === "list" ? classes.viewColumn : classes.veiwRow}>
          {selectedView === "list" ? (
            <MyApplicationsList applicantInfo={searchResults} />
          ) : (
            <MyApplicationsGrid applicantInfo={searchResults} />
          )}
        </div>
      </ContainerComeBack>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: getApplicantInfo(state),
  endpoints: getEndpoints(state)
});

const mapDispatchToProps = {
  retrieveApplicantInfo
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyApplications)
);
