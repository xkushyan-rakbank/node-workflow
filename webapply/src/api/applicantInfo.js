import httpClient from "./axiosConfig";

export function applicantInfoFormSubmit(data) {
  return httpClient.post(
    `/webapply/api/v1/banks/RAK/usertypes/sme/prospects/`,
    data
  );
}
