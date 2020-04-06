/* istanbul ignore file */

export const log = error => {
  if (process.env.NODE_ENV === "development") {
    console.error({ error });
  }
};
