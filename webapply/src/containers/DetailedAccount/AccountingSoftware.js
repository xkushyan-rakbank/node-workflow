import React from "react";
import { withStyles } from "@material-ui/core";
import logo from "./../../assets/images/logo.png";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";

const style = {
  icon: {
    fontSize: "55px",
    color: "green"
  },
  stepfirstGroup: {
    paddingTop: "150px"
  },
  stepSectionIndent: {
    marginBottom: "40px"
  },
  image: {
    height: "370px",
    paddingTop: "80px",
    "& span": {
      maxWidth: "380px"
    },
    background: `url(${logo}) no-repeat 50% 90%/40%`
  }
};

const AccountingSoftware = ({ classes }) => (
  <>
    <div className={classes.image} />
    <div className={classes.stepfirstGroup}>
      <div className={classes.stepSectionIndent}>
        <SectionTitleWithInfo
          title="Scale at your own pace"
          info="We need to spend some time getting to know you and your company"
        />
      </div>
    </div>
  </>
);

export default withStyles(style)(AccountingSoftware);
