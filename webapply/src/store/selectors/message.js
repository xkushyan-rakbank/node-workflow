import { getUiConfig } from "./appConfig";

export const getMessageById = (state, id) => {
  return (
    getUiConfig(state)[id] ||
    "Lorem ipsum dolor sit amet, malesuada mauris amet nulla velit odio cursus, natoque donec luctus integer culpa risus sed ea."
  );
};
