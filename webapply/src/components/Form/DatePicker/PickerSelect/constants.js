export const MONTH_OPTIONS = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" }
];

export const getYearOptions = () => {
  const years = [];
  const now = new Date(Date.now());

  for (let i = 1950; i <= now.getFullYear(); i++) {
    years.push({ value: i, label: i });
  }
  return years;
};
