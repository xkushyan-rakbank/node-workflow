import React, { memo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useStyles } from "./styled";
// eslint-disable-next-line max-len
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function areEqualFileProp(prefFile, nextFile) {
  return prefFile.file === nextFile.file;
}
const PdfToPngConverter = ({ file }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const classes = useStyles();

  function onDocumentLoadSuccess({ numPages }) {
    setPageNumber(numPages);
  }
  return (
    <Document file={file} className={classes.previewPDF} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from({ length: pageNumber }, (_, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
};
export const PdfPreview = memo(PdfToPngConverter, areEqualFileProp);
