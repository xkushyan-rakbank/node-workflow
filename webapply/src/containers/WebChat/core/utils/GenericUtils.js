export const callSafely = (method, args = null) => {
  if (typeof method === "function") {
    return method(args);
  }
};
