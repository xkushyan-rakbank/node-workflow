import React, { useEffect, useState } from "react";
import { ReCaptchaNotRobot } from "./ReCaptchaNotRobot";

/**
 * @see https://developers.google.com/recaptcha/docs/display
 */
export const ReCaptcha = props => {
  const [grecaptcha, setGrecaptcha] = useState(window.grecaptcha);

  useEffect(() => {
    if (!grecaptcha) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("defer", "");
      script.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&render=explicit&hl=en"
      );
      document.body.appendChild(script);
      window.recaptchaOnloadCallback = () => {
        setGrecaptcha(window.grecaptcha);
      };
    }
    return () => {
      window.recaptchaOnloadCallback = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!grecaptcha) {
    return null;
  }

  return <ReCaptchaNotRobot {...props} grecaptcha={grecaptcha} />;
};
