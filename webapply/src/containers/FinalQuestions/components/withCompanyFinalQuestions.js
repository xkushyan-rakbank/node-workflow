// import { useEffect, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
//
// import { COMPANY_FIELD_NAME, FINAL_QUESTIONS_PAGE } from "./CompanySummaryCard/constants";
// import { setCompanyStepsComplete } from "../../../store/actions/completedSteps";

export const withCompanyFinalQuestions = cb => props => {
  // const isCompanyStepsCompleted = useSelector(
  //   state => state.completedSteps[FINAL_QUESTIONS_PAGE][COMPANY_FIELD_NAME]
  // );
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const initialFilledCompany = useMemo(() => isCompanyStepsCompleted, []);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const actualCompletedSteps = !Object.keys(props.errors).length && initialFilledCompany;
  //
  //   if (actualCompletedSteps !== isCompanyStepsCompleted) {
  //     dispatch(setCompanyStepsComplete(actualCompletedSteps));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.errors]);

  return cb(props);
};
