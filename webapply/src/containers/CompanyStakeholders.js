import React from "react";
import FilledStakeholderCard from "../components/FilledStakeholderCard";
import StakeholderStepper from "./StakeholderStepper";

class CompanyStakeholders extends React.Component {
  state = {
    stakeholders: [
      {
        id: 343453542345,
        firstName: "Christer",
        lastName: "Petterson",
        signatoryRights: true,
        shareholding: 51
      }
    ],
    isFinalScreenShown: true
  };

  render() {
    const { stakeholders } = this.state;
    return (
      <>
        <h2>Add Company Stakeholders</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>

        <div>
          {stakeholders.map(item => (
            <FilledStakeholderCard {...item} key={item.id} />
          ))}
        </div>

        <StakeholderStepper />
      </>
    );
  }
}

export default CompanyStakeholders;
