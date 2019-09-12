import React from "react";
import { withStyles } from "@material-ui/core";
import SectionTitle from "../SectionTitle";
import Subtitle from "../Subtitle";
import Checkbox from "../InputField/RefactoredCheckbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import InfoTitle from "../InfoTitle";
import TextInput from "../InputField/TextInput";

const style = {
  formWrapper: {
    margin: 0
  },
  contactsTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  signatoryLabel: {
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "40px",
    lineHeight: 2.14,
    color: "#373737"
  }
};

class AccountDetails extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <FormWrapper
        className={this.props.classes.formWrapper}
        handleContinue={this.props.goToNext}
      >
        <SectionTitle title="Channels" />

        <div className="paper">
          <div className={classes.contactsTitle}>
            <Subtitle title="Debit Cards" />
            <InfoTitle title="These will be mailed by courier to your preferred address" />
          </div>
          <Checkbox id="Acnt.debitCardApplied" indexes={[0]} />
          <div className={classes.signatoryLabel}>
            [Signatory number 1 name]
          </div>
          <TextInput id="SigDbtcAuths.nameOnDebitCard" indexes={[0]} />
        </div>

        <div className="paper">
          <div className={classes.contactsTitle}>
            <Subtitle title="Cheque book" />
            <InfoTitle title="These will be mailed by courier to your preferred address" />
          </div>
          <Checkbox id="Acnt.chequeBookApplied" indexes={[0]} />
        </div>

        <div className="paper">
          <Subtitle title="Bank statements" />
          <Checkbox id="Acnt.eStatements" indexes={[0]} />
          <Checkbox id="Acnt.mailStatements" indexes={[0]} />
        </div>
      </FormWrapper>
    );
  }
}

export default withStyles(style)(AccountDetails);
