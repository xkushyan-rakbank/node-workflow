import React from "react";
import { withStyles } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Subtitle from "../Subtitle";
import Checkbox from "../InputField/RefactoredCheckbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import InfoTitle from "../InfoTitle";
import TextInput from "../InputField/TextInput";
import RadioButton from "../InputField/RadioButton";
import Divider from "../Divider";

const style = {
  formWrapper: {
    margin: 0,
    position: "relative"
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
  },
  signatoryNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "12px",
    "& div + div": {
      marginTop: "20px"
    }
  },
  signatoryName: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& span": {
      fontSize: "14px",
      fontFamily: "Open Sans"
    }
  },
  selectCombined: {
    margin: "0 !important",
    width: "360px",
    "& input": {
      fontWeight: "600"
    }
  }
};

const AccountDetails = props => {
  const { classes, goToNext } = props;
  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <div className={classes.contactsTitle}>
        <Subtitle title="Debit Cards" />
      </div>

      <Checkbox id="Acnt.debitCardApplied" indexes={[0]} style={{ marginTop: "10px" }} />

      <div className={classes.signatoryLabel}>Signatory name</div>
      <InfoTitle
        title="Names on debit cards have a limit of 19 characters"
        styles={{ marginTop: "0" }}
      />

      <div className={classes.signatoryNamesContainer}>
        <div className={classes.signatoryName}>
          <span>Vartika Gupta</span>
          <TextInput
            id="SigDbtcAuths.nameOnDebitCard"
            indexes={[0]}
            classes={{ regularWrapper: classes.selectCombined, input: classes.input }}
          />
        </div>

        <div className={classes.signatoryName}>
          <span>Vartika Gupta</span>
          <TextInput
            id="SigDbtcAuths.nameOnDebitCard"
            indexes={[0]}
            classes={{ regularWrapper: classes.selectCombined, input: classes.input }}
          />
        </div>
      </div>

      <Divider styles={{ marginBottom: "0" }} />

      <div className={classes.contactsTitle}>
        <Subtitle title="Cheque book" />
      </div>
      <Checkbox id="Acnt.chequeBookApplied" indexes={[0]} />

      <Divider styles={{ marginBottom: "0" }} />

      <Subtitle title="Bank statements" />
      {/*<Checkbox id="Acnt.eStatements" indexes={[0]} />*/}
      {/*<Checkbox id="Acnt.mailStatements" indexes={[0]} />*/}
      <RadioGroup name="Bank statements">
        <RadioButton value="any" label="I want online bank statements" />
        <RadioButton value="any 3" label="I want paper statements (monthly charges apply)" />
      </RadioGroup>

      <InfoTitle
        title="These will be mailed by courier to your preferred address"
        styles={{ position: "absolute", bottom: "11px" }}
      />
    </FormWrapper>
  );
};

export default withStyles(style)(AccountDetails);
