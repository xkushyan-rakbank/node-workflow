import { useSelector } from "react-redux";

export const useCompletedStep = id =>
  useSelector(
    state => state.completedSteps.find(item => item.flowId === id) || { flowId: id, steps: [] }
  );
