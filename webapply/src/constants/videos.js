import rakStarterVideo from "../assets/videos/Rakstarter.mp4";
import rakStarterVideoWebm from "../assets/videos/Rakstarter.webm";
import rakStarterVideoPoster from "../assets/images/videoPosters/Rakstarter.jpg";

import rakStarterIslamicVideo from "../assets/videos/Rakstarter_Islamic.mp4";
import rakStarterIslamicVideoWebm from "../assets/videos/Rakstarter_Islamic.webm";
import rakStarterIslamicVideoPoster from "../assets/images/videoPosters/Rakstarter_Islamic.jpg";

import currentAccountVideo from "../assets/videos/CurrentAccount.mp4";
import currentAccountVideoWebm from "../assets/videos/CurrentAccount.webm";
import currentAccountVideoPoster from "../assets/images/videoPosters/CurrentAccount.jpg";

import currentAccountIslamicVideo from "../assets/videos/RakCurrentAccount_islamic.mp4";
import currentAccountIslamicVideoWebm from "../assets/videos/RakCurrentAccount_islamic.webm";
import currentAccountIslamicVideoPoster from "../assets/images/videoPosters/RakCurrentAccount_islamic.jpg";

import rakEliteVideo from "../assets/videos/RakElite.mp4";
import rakEliteVideoWebm from "../assets/videos/RakElite.webm";
import rakEliteVideoPoster from "../assets/images/videoPosters/RakElite.jpg";

import rakEliteIslamicVideo from "../assets/videos/Rakelite_islamic.mp4";
import rakEliteIslamicVideoWebm from "../assets/videos/Rakelite_islamic.webm";
import rakEliteIslamicVideoPoster from "../assets/images/videoPosters/Rakelite_islamic.jpg";

import accountComparisonPoster from "../assets/images/videoPosters/Account comparison.jpg";
import accountComparisonVideo from "../assets/videos/Accountcomparison.webm";
import accountComparisonVideoMP4 from "../assets/videos/Accountcomparison.mp4";

import landingPoster from "../assets/images/videoPosters/LandingVideo.png";
import landingVideoWebm from "../assets/videos/LandingVideo.webm";
import landingVideoMP4 from "../assets/videos/LandingVideo.mp4";

import { accountNames } from "./index";

export const videos = [
  {
    accountType: accountNames.starter,
    isIslamic: false,
    mp4: rakStarterVideo,
    webm: rakStarterVideoWebm,
    poster: rakStarterVideoPoster
  },
  {
    accountType: accountNames.starter,
    isIslamic: true,
    mp4: rakStarterIslamicVideo,
    webm: rakStarterIslamicVideoWebm,
    poster: rakStarterIslamicVideoPoster
  },
  {
    accountType: accountNames.currentAccount,
    isIslamic: false,
    mp4: currentAccountVideo,
    webm: currentAccountVideoWebm,
    poster: currentAccountVideoPoster
  },
  {
    accountType: accountNames.currentAccount,
    isIslamic: true,
    mp4: currentAccountIslamicVideo,
    webm: currentAccountIslamicVideoWebm,
    poster: currentAccountIslamicVideoPoster
  },
  {
    accountType: accountNames.elite,
    isIslamic: false,
    mp4: rakEliteVideo,
    webm: rakEliteVideoWebm,
    poster: rakEliteVideoPoster
  },
  {
    accountType: accountNames.elite,
    isIslamic: true,
    mp4: rakEliteIslamicVideo,
    webm: rakEliteIslamicVideoWebm,
    poster: rakEliteIslamicVideoPoster
  },
  {
    accountType: "",
    isIslamic: false,
    mp4: accountComparisonVideoMP4,
    webm: accountComparisonVideo,
    poster: accountComparisonPoster
  }
];

export const landingVideo = {
  accountType: accountNames.starter,
  isIslamic: false,
  mp4: landingVideoMP4,
  webm: landingVideoWebm,
  poster: landingPoster
};
