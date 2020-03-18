import { createPortal } from "react-dom";
import { usePortal } from "../hooks/usePortal";

export const Portal = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};
