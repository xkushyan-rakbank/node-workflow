export const getOptionsForSubId = (value, valueConfig, notIncludesValue) => {
  if (value) {
    let optionsArr = [];

    if (notIncludesValue) {
      optionsArr = valueConfig.datalist.filter(item => value === item.key);
    } else {
      optionsArr = valueConfig.datalist.filter(item => value.includes(item.key));
    }

    const subOptionsArr = optionsArr
      .map(item => item.subCategory)
      .reduce((acc, curr) => [...acc, ...curr], []);
    return subOptionsArr;
  }
};
