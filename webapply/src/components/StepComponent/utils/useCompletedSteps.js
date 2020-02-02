import { useSelector } from "react-redux";

export const useCompletedStep = (page, path, index) => {
  const pageCompletedSteps = useSelector(state => state.completedSteps[page] || {});
  let completedSteps;

  if (index) {
    completedSteps = pageCompletedSteps[path][index] || [];
  } else {
    completedSteps = pageCompletedSteps[path] || [];
  }

  return [pageCompletedSteps, completedSteps];
};
