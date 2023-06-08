import React from "react";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { TopCustomers } from "./TopCustomers";
import { TopSuppliers } from "./TopSuppliers";

export const BusinessRelationship = values => {
  return (
    <div>
      <Accordion title={"Business relationships"} id={"business"}>
        <TopCustomers {...values} />
        <TopSuppliers />
      </Accordion>
    </div>
  );
};
