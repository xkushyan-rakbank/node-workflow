import sortBy from "lodash/sortBy";

const formatItem = ({ modifiedDateTime, ...rest }) => {
  let [date, time] = modifiedDateTime.split(" ");
  date = date
    .split("-")
    .reverse()
    .join("-");

  return {
    ...rest,
    modifiedDateTime: [date, time].join(" ")
  };
};

export const formatAuditTrailInfo = (auditTrailInfo = []) =>
  sortBy(auditTrailInfo.map(formatItem), ["modifiedDateTime"]).reverse();
