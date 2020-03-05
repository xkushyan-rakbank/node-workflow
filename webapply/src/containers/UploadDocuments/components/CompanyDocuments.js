import React from "react";
import { UploadDocuments } from "./UploadDocument";
import { ICONS, Icon } from "./../../../components/Icons";
import { useStyles } from "./styled";

export const CompanyDocuments = ({
  documents,
  companyName,
  icon = "",
  sendProspectToAPI,
  isApplyEditApplication,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.companyIconWrap}>{icon || <Icon name={ICONS.brief} />}</div>
        <div className={classes.contentBox}>
          <h3 className={classes.label}>{companyName}</h3>
        </div>
      </header>
      {documents.map((document, index) => (
        <UploadDocuments
          key={`${document.documentType}-${document.documentKey}`}
          index={index}
          document={document}
          type="companyDocuments"
          sendProspectToAPI={sendProspectToAPI}
          isApplyEditApplication={isApplyEditApplication}
          {...rest}
        />
      ))}
    </div>
  );
};
