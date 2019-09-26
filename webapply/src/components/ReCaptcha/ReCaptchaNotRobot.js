import React from "react";

const PUB_KEY = process.env.REACT_APP_RECAPTCHA_NOT_ROBOT_PUBLIC_KEY || " ";

class ReCaptchaNotRobot extends React.PureComponent {
  static defaultProps = {
    onVerify: () => {},
    onExpired: () => {},
    onError: () => {}
  };

  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
    this.reCaptchaId = 0;
    this.options = {
      sitekey: PUB_KEY,
      size: "normal",
      callback: props.onVerify,
      "expired-callback": props.onExpired,
      "error-callback": props.onError
    };
  }

  componentDidMount() {
    this.reCaptchaId = this.props.grecaptcha.render(this.rootRef.current, this.options);
  }

  componentWillUnmount() {
    this.props.grecaptcha.reset(this.reCaptchaId);
  }

  render() {
    const { onVerify, onExpired, onError, grecaptcha, ...rest } = this.props;

    return <div {...rest} ref={this.rootRef} className="g-recaptcha" />;
  }
}

export default ReCaptchaNotRobot;
