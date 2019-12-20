import { videos } from "../constants/videos";

export const getVideoByAccountType = ({ accountType, islamicBanking = false }) =>
  videos.find(video => video.isIslamic === islamicBanking && video.accountType === accountType);
