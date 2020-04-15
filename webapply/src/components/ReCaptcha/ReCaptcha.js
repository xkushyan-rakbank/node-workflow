import React, { useEffect, useState } from "react";
import { ReCaptchaNotRobot } from "./ReCaptchaNotRobot";

export const ReCaptcha = props => {
  const [grecaptcha, setGrecaptcha] = useState(window !== "undefined" && window.grecaptcha);

  useEffect(() => {
    if (!grecaptcha && window !== "undefined") {
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
      if (typeof window !== "undefined") {
        window.recaptchaOnloadCallback = () => {};
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return grecaptcha ? <ReCaptchaNotRobot {...props} grecaptcha={grecaptcha} /> : null;
};
