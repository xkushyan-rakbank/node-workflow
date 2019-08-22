import React, { memo } from "react";
import { useRecaptcha } from "./hooks";
import ReCaptchaNotRobot from "./ReCaptchaNotRobot";

export const COMPONENTS_BY_TYPE = {
  NOT_ROBOT: ReCaptchaNotRobot
};

/**
 * @see https://developers.google.com/recaptcha/docs/display
 * @param {Function} verifyCallback
 * @param {String} type
 * @param {Object} rest
 * @return {Node}
 * @constructor
 */
const ReCaptcha = ({ type, ...rest }) => {
  const grecaptcha = useRecaptcha();

  const Component = COMPONENTS_BY_TYPE[type];

  if (!Component || !grecaptcha) {
    return null;
  }

  return <Component {...rest} grecaptcha={grecaptcha} />;
};

ReCaptcha.types = {
  NOT_ROBOT: "NOT_ROBOT"
};

ReCaptcha.defaultProps = {
  type: ReCaptcha.types.NOT_ROBOT
};

export default memo(ReCaptcha);
