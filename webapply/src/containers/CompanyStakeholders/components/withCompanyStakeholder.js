import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import { setFillStakeholder } from "../../../store/actions/stakeholders";
import { getStakeholdersIds } from "../../../store/selectors/stakeholder";

export const withCompanyStakeholder = (index, cb) => props => {
  const stakeholdersIds = useSelector(getStakeholdersIds);
  const isFilledStakeholder = get(stakeholdersIds, `[${index}].done`, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialFilledStakeholder = useMemo(() => isFilledStakeholder, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const actualFilledStakeholder = Object.keys(props.errors).length && initialFilledStakeholder;

    if (actualFilledStakeholder !== isFilledStakeholder) {
      dispatch(setFillStakeholder(index, actualFilledStakeholder));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors]);

  return cb(props);
};
