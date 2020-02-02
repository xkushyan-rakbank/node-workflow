export const addCompletedStep = (pageCompletedSteps, completedSteps, step, page, path, index) => {
  let steps;

  if (index !== null) {
    steps = {
      ...pageCompletedSteps,
      [path]: pageCompletedSteps[path].map((item, idx) => {
        if (index === idx) {
          return [...item, step];
        }
        return item;
      })
    };
  } else {
    steps = {
      ...pageCompletedSteps,
      [path]: [...pageCompletedSteps[path], step]
    };
  }

  return steps;
};
