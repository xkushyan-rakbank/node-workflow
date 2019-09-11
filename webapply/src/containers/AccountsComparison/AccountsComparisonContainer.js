import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";

const style = {
  container: {
    display: "inline-block",
    "& + &": {
      marginTop: "150px"
    }
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "40px"
  },
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "33px",
    display: "block"
  }
};

class AccountsComparisonContainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <SectionTitleWithInfo
          title="One business account for every business stage"
          info="Wherever your business is, our accounts will meet you there"
        />
        {this.props.children}
        <span className={classes.note}>
          Note: Companies older than 12 months are not eligible for the
          RAKstarter account
        </span>
      </div>
    );
  }
}

export default withStyles(style)(AccountsComparisonContainer);
