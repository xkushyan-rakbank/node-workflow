import DateFnsUtils from "@date-io/date-fns";

export class LocalizedUtils extends DateFnsUtils {
  getWeekdays() {
    return ["M", "T", "W", "T", "F", "S", "S"];
  }
}

export const getYearOptions = isFutureDisabled => {
  const years = [];
  const lastYear = isFutureDisabled ? new Date().getFullYear() : 2100;

  for (let i = 1950; i <= lastYear; i++) {
    years.push({ value: i, label: i });
  }
  return years;
};
