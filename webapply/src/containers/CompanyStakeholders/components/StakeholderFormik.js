import { useEffect } from "react";

export const withCompanyStakeholderFormik = (
  { filledStakeholder, setUnfilledStakeholder },
  cb
) => props => {
  useEffect(() => {
    if (filledStakeholder && Object.keys(props.errors).length) {
      setUnfilledStakeholder();
    }
  }, [props.errors]);

  return cb(props);
};
