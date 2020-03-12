export const cloneDeep = obj => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(el => cloneDeep(el));
  } else {
    return Object.keys(obj).reduce((acc, prop) => ({ ...acc, [prop]: cloneDeep(obj[prop]) }), {});
  }
};
