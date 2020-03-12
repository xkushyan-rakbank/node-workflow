export const cloneDeep = obj => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  } else if (Array.isArray(obj)) {
    let clonedArr = [];
    obj.forEach(el => clonedArr.push(cloneDeep(el)));
    return clonedArr;
  } else {
    let clonedObj = {};
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        clonedObj[prop] = cloneDeep(obj[prop]);
      }
    }
    return clonedObj;
  }
};

export default cloneDeep;
