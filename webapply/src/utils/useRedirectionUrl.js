import { useSelector } from "react-redux";
import { getApplicationInfo } from "../store/selectors/appConfig";

export default function useRedirectionUrl() {
  const applicantionInfo = useSelector(getApplicationInfo);

  const redirectToExternalURL = externalURL => {
    const data = {
      islamicBanking: applicantionInfo.islamicBanking,
      accountType: applicantionInfo.accountType
    };

    const params = new URLSearchParams();

    for (const key in data) {
      params.append(key, data[key]);
    }

    const encodedQuery = params.toString();
    const url = `${externalURL}?${encodedQuery}`;
    return url;
  };

  return { redirectToExternalURL };
}
