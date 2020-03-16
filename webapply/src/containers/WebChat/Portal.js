import ReactDOM from "react-dom";

export const Portal = ({ children }) => {
  const node = document.getElementById("chat");
  return ReactDOM.createPortal(children, node);
};
