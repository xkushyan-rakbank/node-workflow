export const formattedAccTimeStamp = date =>
  toIsoLocalTime(date)
    .replace("T", " ")
    .substring(0, 19);

function toIsoLocalTime(value) {
  if (value instanceof Date === false) value = new Date();
  const off = value.getTimezoneOffset() * -1;
  const del = value.getMilliseconds() ? "Z" : "."; // have milliseconds ?
  value = new Date(value.getTime() + off * 60000); // add or subtract time zone
  return (
    value.toISOString().split(del)[0] +
    (off < 0 ? "-" : "+") +
    ("0" + Math.abs(Math.floor(off / 60))).substr(-2) +
    ":" +
    ("0" + Math.abs(off % 60)).substr(-2)
  );
}
