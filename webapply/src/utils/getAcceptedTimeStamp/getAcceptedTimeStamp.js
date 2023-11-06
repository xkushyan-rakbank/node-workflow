export const formattedAccTimeStamp = date =>
  date
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
