import sortBy from "lodash/sortBy";
import indexOf from "lodash/indexOf";

export const sortByOrder = (arr, order, key) =>
  sortBy(arr, obj => indexOf(order, obj[key || "key"]));
