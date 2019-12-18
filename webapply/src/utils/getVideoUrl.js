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

const getDataAsObject = (mp4, webm, posterUrl) => ({ videoUrls: { mp4, webm }, posterUrl });

const getVideoUrl = applicationInfo => {
  const { islamicBanking, accountType } = applicationInfo;

  if (accountType === "RAKstarter") {
    return islamicBanking
      ? getDataAsObject(
          RAKstarterIslamicVideo,
          RAKstarterIslamicVideoWebm,
          RAKstarterIslamicVideoPoster
        )
      : getDataAsObject(RAKstarterVideo, RAKstarterVideoWebm, RAKstarterVideoPoster);
  }
  if (accountType === "Current Account") {
    return islamicBanking
      ? getDataAsObject(
          CurrentAccountIslamicVideo,
          CurrentAccountIslamicVideoWebm,
          CurrentAccountIslamicVideoPoster
        )
      : getDataAsObject(CurrentAccountVideo, CurrentAccountVideoWebm, CurrentAccountVideoPoster);
  }
  if (accountType === "RAKelite") {
    return islamicBanking
      ? getDataAsObject(RAKeliteIslamicVideo, RAKeliteIslamicVideoWebm, RAKeliteIslamicVideoPoster)
      : getDataAsObject(RAKeliteVideo, RAKeliteVideoWebm, RAKeliteVideoPoster);
  }
};

export default getVideoUrl;
