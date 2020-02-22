export const ADD_PLAYED_VIDEO = "ADD_PLAYED_VIDEO";

export const addPlayedVideo = videoId => {
  return {
    type: ADD_PLAYED_VIDEO,
    payload: videoId
  };
};
