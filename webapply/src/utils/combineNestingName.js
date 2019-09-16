const combineNestingName = (name, indexes) => {
  return indexes.reduce((acc, index) => acc.replace("*", index), name);
};

export default combineNestingName;
