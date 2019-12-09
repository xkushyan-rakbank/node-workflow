import React from "react";
import UploadDocument from "./../../../components/UploadDocument/UploadDocument";
import { ICONS, Icon } from "./../../../components/Icons";
import { useStyles } from "./styled";

export const CompanyDocuments = ({ documents, companyName, icon = "" }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.companyIconWrap}>{icon || <Icon name={ICONS.brief} />}</div>
        <div className={classes.contentBox}>
          <h3 className={classes.label}>{companyName}</h3>
        </div>
      </header>
      {documents.map(document => (
        <UploadDocument key={document.documentKey} documents={document} type="companyDocument" />
      ))}
    </div>
  );
};
