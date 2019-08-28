const combineNestingName = (name, indexes) => {
  let iterator = 0;
  return name.replace(/\*/gi, () => {
    const index = indexes[iterator];
    iterator++;
    return index;
  });
};

export default combineNestingName;
