import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SIGNATORY_FIELD_NAME } from "./SignatorySummaryCard/constants";
import { FINAL_QUESTIONS_PAGE } from "./CompanySummaryCard/constants";
import { setSignatoryStepsComplete } from "../../../store/actions/completedSteps";

export const withSignatoriesFinalQuestions = (index, cb) => props => {
  const isSignatoryStepsCompleted = useSelector(
    state => state.completedSteps[FINAL_QUESTIONS_PAGE][SIGNATORY_FIELD_NAME][index]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialFilledSignatory = useMemo(() => isSignatoryStepsCompleted, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const actualFilledStakeholder = !Object.keys(props.errors).length && initialFilledSignatory;

    if (actualFilledStakeholder !== isSignatoryStepsCompleted) {
      dispatch(setSignatoryStepsComplete(index, actualFilledStakeholder));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors]);

  return cb(props);
};
