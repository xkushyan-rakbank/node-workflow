import React from "react";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import TextInput from "../components/InputField/TextInput";
import ReCaptcha from "../components/ReCaptcha/ReCaptcha";
import CombinedSelect from "../components/InputField/CombinedSelect";
import CustomCheckbox from "../components/InputField/Checkbox";
import SubmitButton from "../components/Buttons/SubmitButton";
import { codes } from "./../constants";

const styles = {
  baseForm: {
    maxWidth: "612px"
  },
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  }
};

const BasicsForm = props => {
  const { classes } = props;

  const handleSubmit = values => {
    console.log("values", JSON.stringify(values, null, 2));
  };

  return (
    <div className={classes.baseForm}>
      <h2>Let’s Start with the Basics</h2>
      <p className="formDescription">
        We know from experience users may get scared when asked for details. We
        need a trust-creating message, to explain why we need them (autosave and
        finish at a later stage)
      </p>

      <form onSubmit={handleSubmit}>
        <TextInput id="UI0001" />
        <TextInput id="UI0002" />

        <CombinedSelect selectId="UI0003" inputId="UI0004" />
        <CustomCheckbox
          name="apply"
          label="I am applying on behalf of someone’s company "
        />
        <ErrorBoundary className={classes.reCaptchaContainer}>
          <ReCaptcha
            onVerify={token =>
              console.log("ReCaptcha onVerify callback:", token)
            }
            onExpired={() =>
              console.log("ReCaptcha onExpired callback (2 min)")
            }
            onError={() => console.log("ReCaptcha onError callback")}
          />
        </ErrorBoundary>

        <Link to="/confirm">
          <SubmitButton />
        </Link>
      </form>
    </div>
  );
};

export default compose(withStyles(styles))(BasicsForm);
