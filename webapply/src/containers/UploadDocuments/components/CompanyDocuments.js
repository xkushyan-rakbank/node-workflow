import React from "react";
import { DocumentRow } from "../DocumentRow";
import { ICONS, Icon } from "./../../../components/Icons";
import { useStyles } from "./styled";

export const CompanyDocuments = ({ documents, companyName }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.companyIconWrap}>
          <Icon name={ICONS.brief} />
        </div>
        <div className={classes.contentBox}>
          <h3 className={classes.label}>{companyName}</h3>
        </div>
      </header>
      {documents.map((document, index) => (
        <DocumentRow
          key={`${document.documentType}-${document.documentKey}`}
          index={index}
          document={document}
          type="companyDocuments"
        />
      ))}
    </div>
  );
};
