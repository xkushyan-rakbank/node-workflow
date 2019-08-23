import React, { useEffect, useRef } from "react";

const PUB_KEY = process.env.REACT_APP_RECAPTCHA_NOT_ROBOT_PUBLIC_KEY || " ";

/**
 * @param {Function} onVerify
 * @param {Function} onExpired
 * @param {Function} onError
 * @param {Object} grecaptcha
 * @param {Function} grecaptcha.render
 * @param {Function} grecaptcha.reset
 * @param {Function} grecaptcha.getResponse
 * @param {Object} rest - proxy props
 * @return {Node}
 * @constructor
 */
const ReCaptchaNotRobot = ({
  onVerify,
  onExpired,
  onError,
  grecaptcha,
  ...rest
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const id = grecaptcha.render(ref.current, {
      sitekey: PUB_KEY,
      size: "normal",
      callback: onVerify,
      "expired-callback": onExpired,
      "error-callback": onError
    });

    return () => {
      grecaptcha.reset(id);
    };
  }, [grecaptcha]);

  return <div {...rest} ref={ref} className="g-recaptcha" />;
};

ReCaptchaNotRobot.defualtProps = {
  onVerify: () => {},
  onExpired: () => {},
  onError: () => {}
};

export default ReCaptchaNotRobot;
