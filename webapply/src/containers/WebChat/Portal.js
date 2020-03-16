import ReactDOM from "react-dom";
import { useEffect } from "react";

let defaultNode = null;

export const Portal = ({ children }) => {
  useEffect(() => {
    return () => {
      if (defaultNode) {
        document.body.removeChild(defaultNode);
      }

      defaultNode = null;
    };
  }, []);

  if (!defaultNode) {
    defaultNode = document.createElement("div");
    document.body.appendChild(defaultNode);
  }

  return ReactDOM.createPortal(children, defaultNode);
};
