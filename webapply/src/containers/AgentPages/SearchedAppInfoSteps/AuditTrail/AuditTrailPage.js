import React, { useMemo } from "react";
import sortBy from "lodash/sortBy";

import { AuditTrail } from "./components/AuditTrail";

const formatAuditTrailInfo = ({ modifiedDateTime, ...rest }) => {
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

export const AuditTrailPage = ({ prospectOverview = {} }) => {
  const auditTrailInfo = prospectOverview.AuditTrailInfo || [];
  const sortedAuditTrailInfo = useMemo(
    () => sortBy(auditTrailInfo.map(formatAuditTrailInfo), ["modifiedDateTime"]).reverse(),
    [auditTrailInfo]
  );

  return <AuditTrail data={sortedAuditTrailInfo} />;
};
