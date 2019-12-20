import RAKstarterVideo from "../assets/videos/Rakstarter.mp4";
import RAKstarterVideoWebm from "../assets/videos/Rakstarter.webm";
import RAKstarterVideoPoster from "../assets/images/videoPosters/Rakstarter.jpg";

import RAKstarterIslamicVideo from "../assets/videos/Rakstarter_Islamic.mp4";
import RAKstarterIslamicVideoWebm from "../assets/videos/Rakstarter_Islamic.webm";
import RAKstarterIslamicVideoPoster from "../assets/images/videoPosters/Rakstarter_Islamic.jpg";

import CurrentAccountVideo from "../assets/videos/CurrentAccount.mp4";
import CurrentAccountVideoWebm from "../assets/videos/CurrentAccount.webm";
import CurrentAccountVideoPoster from "../assets/images/videoPosters/CurrentAccount.jpg";

import CurrentAccountIslamicVideo from "../assets/videos/RakCurrentAccount_islamic.mp4";
import CurrentAccountIslamicVideoWebm from "../assets/videos/RakCurrentAccount_islamic.webm";
import CurrentAccountIslamicVideoPoster from "../assets/images/videoPosters/RakCurrentAccount_islamic.jpg";

import RAKeliteVideo from "../assets/videos/RakElite.mp4";
import RAKeliteVideoWebm from "../assets/videos/RakElite.webm";
import RAKeliteVideoPoster from "../assets/images/videoPosters/RakElite.jpg";

import RAKeliteIslamicVideo from "../assets/videos/Rakelite_islamic.mp4";
import RAKeliteIslamicVideoWebm from "../assets/videos/Rakelite_islamic.webm";
import RAKeliteIslamicVideoPoster from "../assets/images/videoPosters/Rakelite_islamic.jpg";

import accountComparisonPoster from "../assets/images/videoPosters/Account comparison.jpg";
import accountComparisonVideo from "../assets/videos/Accountcomparison.webm";
import accountComparisonVideoMP4 from "../assets/videos/Accountcomparison.mp4";

import { accountsNames } from "./index";

export const videos = [
  {
    accountType: accountsNames.starter,
    isIslamic: false,
    mp4: RAKstarterVideo,
    webm: RAKstarterVideoWebm,
    poster: RAKstarterVideoPoster
  },
  {
    accountType: accountsNames.starter,
    isIslamic: true,
    mp4: RAKstarterIslamicVideo,
    webm: RAKstarterIslamicVideoWebm,
    poster: RAKstarterIslamicVideoPoster
  },
  {
    accountType: accountsNames.currentAccount,
    isIslamic: false,
    mp4: CurrentAccountVideo,
    webm: CurrentAccountVideoWebm,
    poster: CurrentAccountVideoPoster
  },
  {
    accountType: accountsNames.currentAccount,
    isIslamic: true,
    mp4: CurrentAccountIslamicVideo,
    webm: CurrentAccountIslamicVideoWebm,
    poster: CurrentAccountIslamicVideoPoster
  },
  {
    accountType: accountsNames.elite,
    isIslamic: false,
    mp4: RAKeliteVideo,
    webm: RAKeliteVideoWebm,
    poster: RAKeliteVideoPoster
  },
  {
    accountType: accountsNames.elite,
    isIslamic: true,
    mp4: RAKeliteIslamicVideo,
    webm: RAKeliteIslamicVideoWebm,
    poster: RAKeliteIslamicVideoPoster
  },
  {
    accountType: "",
    isIslamic: false,
    mp4: accountComparisonVideoMP4,
    webm: accountComparisonVideo,
    poster: accountComparisonPoster
  }
];
