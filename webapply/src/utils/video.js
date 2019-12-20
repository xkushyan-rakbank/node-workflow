import { videosData } from "../constants/videos";

export const getCurrentVideoData = ({ accountType = "", islamicBanking = false }) =>
  videosData
    .filter(account => account.accountType === accountType)
    .find(video => video.isIslamic === islamicBanking);
