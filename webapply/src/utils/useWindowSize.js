import { useState, useLayoutEffect } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () => setSize([window.innerWidth, window.innerHeight]);

      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }
  }, [setSize]);

  return size;
}