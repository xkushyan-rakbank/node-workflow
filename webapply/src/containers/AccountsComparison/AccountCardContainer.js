import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AccountTypeCard from "../../components/AccountTypeCard";
import startups_ic from "../../assets/icons/startups_ic.svg";
import businesses_ic from "../../assets/icons/growing_businesses_ic.svg";
import established_businesses_ic from "../../assets/icons/established_businesses_ic.svg";

const style = {
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20
  }
};

const AccountCardContainer = ({ classes }) => (
  <div className={classes.cardsContainer}>
    <AccountTypeCard
      iconSrc={startups_ic}
      title="For Startups or Entrepreneurs"
      differences={[
        "Zero balance account",
        "Preferential transaction fees",
        "Dedicated Relationship Manager"
      ]}
      buttonText="RAKstarter"
    />
    <AccountTypeCard
      iconSrc={businesses_ic}
      title="For Established Businesses"
      differences={["Low balance account", "Low fees", "Dedicated service"]}
      buttonText="Current Account"
    />
    <AccountTypeCard
      iconSrc={established_businesses_ic}
      title="For Exclusive Banking Privileges"
      differences={["Preferential pricing", "No fees", "Fast-tracked services"]}
      buttonText="RAKelite"
    />
  </div>
);

export default withStyles(style)(AccountCardContainer);
