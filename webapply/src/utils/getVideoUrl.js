import RAKstarterVideo from "../assets/videos/Rakstarter.mp4";
import RAKstarterIslamicVideo from "../assets/videos/Rakstarter_Islamic.mp4";
import CurrentAccountVideo from "../assets/videos/CurrentAccount.mp4";
import CurrentAccountIslamicVideo from "../assets/videos/RakCurrentAccount_islamic.mp4";
import RAKeliteVideo from "../assets/videos/RakElite.mp4";
import RAKeliteIslamicVideo from "../assets/videos/Rakelite_islamic.mp4";

const getVideoUrl = applicationInfo => {
  const { islamicBanking, accountType } = applicationInfo;

  if (accountType === "RAKStarter") {
    return islamicBanking ? RAKstarterIslamicVideo : RAKstarterVideo;
  }
  if (accountType === "Current Account") {
    return islamicBanking ? CurrentAccountIslamicVideo : CurrentAccountVideo;
  }
  if (accountType === "RAKelite") {
    return islamicBanking ? RAKeliteIslamicVideo : RAKeliteVideo;
  }
};

export default getVideoUrl;
