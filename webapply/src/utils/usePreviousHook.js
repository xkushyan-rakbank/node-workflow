import { useEffect, useRef } from "react";

export function usePreviousHook(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
