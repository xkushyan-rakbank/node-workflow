import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "recompose";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Chat from "./Chat";
import backgroundImage from "./../assets/images/background-blob.svg";
import { withStyles } from "@material-ui/core/styles";

const style = {
  formNav: {
    flex: "0 0 664px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "30% 0",
    zIndex: "11",
    "@media only screen and (max-width: 991px)": {
      flex: "0 0 45%",
      backgroundPosition: "25% 0"
    },
    "& ul": {
      margin: "0",
      padding: "0",
      paddingRight: "57px",
      "& li": {
        listStyleType: "none",
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "1.2",
        color: "#ffffff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "@media only screen and (max-width: 1100px)": {
          fontSize: "16px"
        },
        "&:not(:last-child)": {
          marginBottom: "30px"
        },
        "&:not(:first-child)": {
          opacity: "0.5"
        }
      }
    }
  },
  icon: {
    fontSize: "12px !important"
  }
};

const FormNavigation = props => {
  const { match, location, history, classes } = props;
  // console.log("match", match);
  // console.log("location", location);
  // console.log("history", history);
  return (
    <div className={classes.formNav}>
      <ul>
        <li>
          Basic Information
          <span className="circle">
            <ArrowBackIcon className={classes.icon} />
          </span>
        </li>
        <li>Company Information</li>
        <li>Company Stakeholders</li>
        <li>Final questions</li>
        <li>Upload Documents</li>
        <li>Somthing Else</li>
      </ul>

      <Chat />
    </div>
  );
};

export default compose(
  withStyles(style),
  withRouter
)(FormNavigation);
