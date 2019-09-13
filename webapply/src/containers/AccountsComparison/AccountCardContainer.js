import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AccountTypeCard from "../../components/AccountTypeCard";
import doneIcon from "../../assets/images/done-icon.png";

const style = {
  cardsContainer: {
    display: "flex",
    marginLeft: "-20px",
    flexWrap: "wrap"
  }
};

const AccountCardContainer = ({ classes }) => (
  <div className={classes.cardsContainer}>
    <AccountTypeCard
      iconSrc={doneIcon}
      title="For Startups or Entrepreneurs"
      differences={[
        "Zero balance account",
        "Atractive interest",
        "Multiple currencies"
      ]}
      buttonText="RAKstarter"
    />
    <AccountTypeCard
      iconSrc={doneIcon}
      title="For Established Businesses"
      differences={["Low balance account", "Low fees", "Dedicated service"]}
      buttonText="Current Account"
    />
    <AccountTypeCard
      iconSrc={doneIcon}
      title="For Exclusive Banking Privileges"
      differences={["Preferential pricing", "No fees", "Fast-tracked services"]}
      buttonText="RAKelite"
    />
  </div>
);

export default withStyles(style)(AccountCardContainer);
