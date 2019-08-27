import React, { PureComponent } from "react";
import ReCaptchaNotRobot from "./ReCaptchaNotRobot";

export const COMPONENTS_BY_TYPE = {
  NOT_ROBOT: ReCaptchaNotRobot
};

/**
 * @see https://developers.google.com/recaptcha/docs/display
 */
class ReCaptcha extends React.PureComponent {
  static types = {
    NOT_ROBOT: "NOT_ROBOT"
  };

  static defaultProps = {
    type: ReCaptcha.types.NOT_ROBOT
  };

  constructor(props) {
    super(props);

    this.state = {
      grecaptcha: window.grecaptcha
    };
  }

  componentDidMount() {
    if (!this.state.grecaptcha) {
      window.recaptchaOnloadCallback = () => {
        this.setState({ grecaptcha: window.grecaptcha });
      };
    }
  }

  componentWillUnmount() {
    window.recaptchaOnloadCallback = () => {};
  }

  render() {
    const { type, ...rest } = this.props;

    const Component = COMPONENTS_BY_TYPE[type];

    if (!Component || !this.state.grecaptcha) {
      return null;
    }
    return <Component {...rest} grecaptcha={this.state.grecaptcha} />;
  }
}

export default ReCaptcha;
