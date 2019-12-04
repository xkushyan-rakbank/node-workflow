import React from "react";
import UploadDocument from "./../../../components/UploadDocument/UploadDocument";
import companyIconSvg from "./../../../assets/icons/brief.png";
import { useStyles } from "./styled";

export const CompanyDocuments = ({ documents, companyName, icon = "" }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.companyIconWrap}>
          {icon || <img src={companyIconSvg} alt="companyIconSvg" />}
        </div>
        <div className={classes.contentBox}>
          <h3 className={classes.label}>{companyName}</h3>
        </div>
      </header>
      {documents.map((document, index) => {
        return (
          <UploadDocument key={index} documents={document} index={index} type="companyDocument" />
        );
      })}
    </div>
  );
};
