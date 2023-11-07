import React, { useEffect, useRef } from "react";

export const ReCaptchaNotRobot = ({
  grecaptcha,
  reCaptchaSiteKey,
  onVerify,
  onExpired,
  onError
}) => {
  const reCaptchaId = useRef(0);
  const rootRef = useRef(null);

  useEffect(() => {
    reCaptchaId.current = grecaptcha.render(rootRef.current, {
      sitekey: process.env.REACT_APP_RECAPTCHA_SITE_KEY || reCaptchaSiteKey,
      size: "normal",
      callback: onVerify,
      "expired-callback": onExpired,
      "error-callback": onError
    });

    return () => {
      grecaptcha.reset(reCaptchaId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={rootRef} className="g-recaptcha" />;
};
