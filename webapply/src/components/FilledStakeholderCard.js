import React from "react";
import { withStyles } from "@material-ui/core";
import CompanyStakeholderCard from "./CompanyStakeholderCard";
import LinkButton from "./Buttons/LinkButton";

const style = {
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 16px"
  },
  indent: {
    marginBottom: "24px"
  }
};

const FilledStakeholderCard = props => {
  const { firstName, lastName, signatoryRights, shareholding, classes } = props;
  const renderContent = () => (
    <>
      <div className={classes.userInfo}>
        <div className={classes.nameField}>{`${firstName} ${lastName}`}</div>
        {signatoryRights && (
          <div className={classes.signatoryField}>Signatory Rights</div>
        )}
        <div className={classes.shareholdingField}>
          {`Shareholding ${shareholding}%`}
        </div>
      </div>

      <LinkButton />
    </>
  );
  return (
    <CompanyStakeholderCard
      firstName={firstName}
      lastName={lastName}
      content={renderContent()}
      className={classes.indent}
    />
  );
};

export default withStyles(style)(FilledStakeholderCard);
