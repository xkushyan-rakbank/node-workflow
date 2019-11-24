export const log = msg => {
  if (process.env.NODE_ENV === "development") {
    console.error(msg);
  }
};
