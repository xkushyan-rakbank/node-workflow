import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "../styled";
import { InformationSection } from "./InformationSection";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import { getProspectId } from "../../../store/selectors/appConfig";
import { CheckList } from "../../AgentPages/SearchedAppInfo/CheckList";
import { getProspectOverviewPromisify } from "../../../store/actions/searchProspect";
import { getFilledOverviewSignatories } from "../../../store/selectors/searchProspect";

export default function ApplicationChecks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [application, setApplication] = useState(null);
  const prospectId = useSelector(getProspectId);
  const signatoryInfo = useSelector(getFilledOverviewSignatories);
  useEffect(() => {
    dispatch(getProspectOverviewPromisify(prospectId)).then(res => {
      setApplication(res);
    });
  }, []);

  return (
    <div className={classes.packageSelectionWrapper}>
      <Accordion
        title={"Checks"}
        id={"checks"}
        classes={{
          accordionRoot: classes.accountServiceAccordionRoot,
          accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails,
          accordionSummaryRoot: classes.accountServiceAccordionSummaryRoot
        }}
      >
        <InformationSection title={""}>
          {application ? (
            <div style={{ flexDirection: "column", width: "100%" }}>
              {" "}
              <CheckList signatoryInfo={signatoryInfo} isReviewSubmit={true} />
            </div>
          ) : (
            <></>
          )}
        </InformationSection>
      </Accordion>
    </div>
  );
}
