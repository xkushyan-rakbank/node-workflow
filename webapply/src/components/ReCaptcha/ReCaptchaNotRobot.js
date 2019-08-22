import React, { useEffect, useRef } from "react";

const PUB_KEY = process.env.REACT_APP_RECAPTCHA_NOT_ROBOT_PUBLIC_KEY;

/**
 * @param {Function} verifyCallback
 * @param {Object} grecaptcha
 * @param {Function} grecaptcha.render
 * @param {Object} rest
 * @return {Node}
 * @constructor
 */
const ReCaptchaNotRobot = ({ verifyCallback, grecaptcha, ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    grecaptcha.render(ref.current, {
      sitekey: PUB_KEY,
      callback: verifyCallback
    });
  }, [grecaptcha]);

  return <div {...rest} ref={ref} className="g-recaptcha" />;
};

ReCaptchaNotRobot.defualtProps = {
  verifyCallback: () => {},
  grecaptcha: {
    render: () => {}
  }
};

export default ReCaptchaNotRobot;
