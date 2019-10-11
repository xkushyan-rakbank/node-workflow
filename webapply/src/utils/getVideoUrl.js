import RAKstarterVideo from "../assets/videos/Rakstarter.mp4";
import RAKstarterVideoPoster from "../assets/images/videoPosters/Rakstarter.jpg";

import RAKstarterIslamicVideo from "../assets/videos/Rakstarter_Islamic.mp4";
import RAKstarterIslamicVideoPoster from "../assets/images/videoPosters/Rakstarter_Islamic.jpg";

import CurrentAccountVideo from "../assets/videos/CurrentAccount.mp4";
import CurrentAccountVideoPoster from "../assets/images/videoPosters/CurrentAccount.jpg";

import CurrentAccountIslamicVideo from "../assets/videos/RakCurrentAccount_islamic.mp4";
import CurrentAccountIslamicVideoPoster from "../assets/images/videoPosters/RakCurrentAccount_islamic.jpg";

import RAKeliteVideo from "../assets/videos/RakElite.mp4";
import RAKeliteVideoPoster from "../assets/images/videoPosters/RakElite.jpg";

import RAKeliteIslamicVideo from "../assets/videos/Rakelite_islamic.mp4";
import RAKeliteIslamicVideoPoster from "../assets/images/videoPosters/Rakelite_islamic.jpg";

const getDataAsObject = (videoUrl, posterUrl) => ({ videoUrl, posterUrl });

const getVideoUrl = applicationInfo => {
  const { islamicBanking, accountType } = applicationInfo;

  if (accountType === "RAKStarter") {
    return islamicBanking
      ? getDataAsObject(RAKstarterIslamicVideo, RAKstarterIslamicVideoPoster)
      : getDataAsObject(RAKstarterVideo, RAKstarterVideoPoster);
  }
  if (accountType === "Current Account") {
    return islamicBanking
      ? getDataAsObject(CurrentAccountIslamicVideo, CurrentAccountIslamicVideoPoster)
      : getDataAsObject(CurrentAccountVideo, CurrentAccountVideoPoster);
  }
  if (accountType === "RAKelite") {
    return islamicBanking
      ? getDataAsObject(RAKeliteIslamicVideo, RAKeliteIslamicVideoPoster)
      : getDataAsObject(RAKeliteVideo, RAKeliteVideoPoster);
  }
};

export default getVideoUrl;
