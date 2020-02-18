import { ADD_PLAYED_VIDEO } from "../actions/video";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLAYED_VIDEO:
      return [...state, payload];
    default:
      return state;
  }
};
