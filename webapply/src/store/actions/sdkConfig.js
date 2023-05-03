export const CREATE_SDK_CONFIG = "CREATE_SDK_CONFIG";
export const CREATE_SDK_CONFIG_SUCCESS = "CREATE_SDK_CONFIG_SUCCESS";

export const createSdkCofig = () => ({
  type: CREATE_SDK_CONFIG
});

export const createSdkCofigSuccess = response => {
  return { type: CREATE_SDK_CONFIG_SUCCESS, payload: response };
};
