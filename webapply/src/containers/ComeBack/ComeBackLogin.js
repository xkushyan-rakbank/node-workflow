import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ContainerComeBack from "./ContainerComeBack";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import TextInput from "../../components/InputField/TextInput";
import PureSelect from "../../components/InputField/PureSelect";
import TextHelpWithLink from "../../components/TextHelpWithLink";
import SubmitButton from "../../components/Buttons/SubmitButton";

const styles = {
  form: {
    width: "100%",
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-height: 768px)": {
      height: 350
    }
  }
};

class ComeBackLogin extends React.Component {
  submitForm = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <ContainerComeBack>
        <SectionTitleWithInfo
          title="Wondering about your application? You came to the right place."
          info="Please enter the login you used when you first applied"
        />

        <form noValidate onSubmit={this.submitForm} className={classes.form}>
          <div>
            <TextInput id="Aplnt.email" />
            <TextInput
              id="Aplnt.mobileNo"
              selectId="Aplnt.countryCode"
              select={<PureSelect id="Aplnt.countryCode" combinedSelect defaultValue="USA" />}
            />

            <TextHelpWithLink
              text="Can’t remember your login?"
              linkText="Chat with us"
              linkTo="#"
            />
          </div>

          <SubmitButton disabled label="Next" justify="flex-end" />
        </form>
      </ContainerComeBack>
    );
  }
}

export default withStyles(styles)(ComeBackLogin);
