import DateFnsUtils from "@date-io/date-fns";

export class LocalizedUtils extends DateFnsUtils {
  getWeekdays() {
    return ["M", "T", "W", "T", "F", "S", "S"];
  }
}

export const getYearOptions = isFutureDisabled => {
  const firstYear = 1900;
  const lastYear = isFutureDisabled ? new Date().getFullYear() : 2100;

  return [...Array(lastYear - firstYear + 1).keys()].map(i => {
    const year = i + firstYear;
    return { value: year, label: year };
  });
};
