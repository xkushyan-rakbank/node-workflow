import React from "react";
import { AddButton } from "../components/Buttons/AddButton";
import MyApplicationsList from "./MyApplicationsList";

export const mockDataMyCurrentApplication = [
  {
    companyName: "Designit Arabia",
    account: "Current Account Islamic",
    status: "Incomplete application",
    action: {
      text: "Finish application",
      status: "notFinished"
    }
  },
  {
    companyName: "Company name",
    account: "RAKelite Islamic",
    status: "New documents needed",
    action: {
      text: "We will call you soon"
    }
  },
  {
    companyName: "Company name",
    account: "RAKelite Islamic",
    status: "New documents needed",
    action: {
      text: "Upload documnts",
      status: "uploadDocs"
    }
  },
  {
    companyName: "Company name",
    account: "RAKelite Islamic",
    status: "Ready to sign",
    action: {
      text: "A waiting text here"
    }
  },
  {
    companyName: "Company name",
    account: "RAKstarter",
    status: "Account activated",
    action: {
      text: "See account",
      status: "activated"
    }
  }
];

class MyApplications extends React.Component {
  render() {
    return (
      <>
        <h2>My applications</h2>
        <AddButton title="New application" />
        <MyApplicationsList currentApplications={mockDataMyCurrentApplication} />
      </>
    );
  }
}

export default MyApplications;
