import React from "react";
import { withStyles } from "@material-ui/core";
import Checkbox from "../components/InputField/Checkbox";
import Button from "../components/Buttons/SubmitButton";
import FormTitle from "../components/FormTitle";
import brief from "../assets/icons/brief.png";

const style = {
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    }
  },
  divider: {
    margin: "26.5px 0 23.5px",
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    marginBottom: "24px"
  },
  listItem: {
    display: "block"
  },
  card: {
    minHeight: "236px",
    margin: "auto auto 40px",
    padding: "40px 20px 42px 20px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0))"
  },
  icon: {
    width: "37px",
    height: "37px",
    border: "solid 1.5px #e9e9ed",
    borderRadius: "50%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>svg": {
      fontSize: "20px"
    }
  },
  mainTitle: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#373737"
  },
  secondaryTitle: {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1.29,
    color: "#263d4c"
  },
  grayText: {
    fontSize: "14px",
    lineHeight: 1.29,
    color: "#86868b"
  }
};

class SubmitApplication extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <FormTitle
          title="Submit application"
          info="And just like that, we have reached the end! Here’s the overview of what you’re applying for."
        />
        <div className={classes.card}>
          <div className={classes.icon}>
            <img src={brief} alt="brief" width={24} height={24} />
          </div>
          <div className={classes.mainTitle}>Designit Arabia</div>
          <div className={classes.grayText}>RAKstarter account</div>
          <div className={classes.divider} />
          <div className={classes.secondaryTitle}>Services selected</div>
          <div className={classes.grayText}>
            AED & USD
            <br />
            Any of you can sign
            <br />
            Debit cards for all signatories
            <br />
            Online bank statements
          </div>
        </div>
        <div className={classes.checkboxesWrapper}>
          <Checkbox
            label="I confirm that the information provided is true and complete"
            className={classes.listItem}
          />
          <Checkbox
            label={
              <span>
                I agree with RakBank’s <a href="/">terms and conditions</a>
              </span>
            }
            className={classes.listItem}
          />
          <Checkbox
            label="I want to receive marketing and promotional communication from RakBank"
            className={classes.listItem}
          />
        </div>
        <Button label="Submit" />
      </>
    );
  }
}

export default withStyles(style)(SubmitApplication);
