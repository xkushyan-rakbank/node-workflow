import { useState } from "react";

/**
 * @return {Object}
 */
export function useRecaptcha() {
  const [grecaptcha, set] = useState(window.grecaptcha);

  if (!grecaptcha) {
    window.recaptchaOnloadCallback = () => {
      set(window.grecaptcha);
    };
  }

  return grecaptcha;
}
