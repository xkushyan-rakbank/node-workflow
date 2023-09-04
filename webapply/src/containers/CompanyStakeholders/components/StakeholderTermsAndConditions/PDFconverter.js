import React, { memo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useStyles } from "./styled";

function areEqualFileProp(prefFile, nextFile) {
  return prefFile.file === nextFile.file && prefFile.pages === nextFile.pages;
}

const PdfToPngConverter = ({ file, pages = [] }) => {
  const classes = useStyles();
  useEffect(() => {
    // eslint-disable-next-line max-len
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  }, []);

  return (
    <div>
      <Document file={file} className={classes.previewPDF}>
        {Array.from({ length: pages.length }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            devicePixelRatio={1}
            scale={1.75}
          />
        ))}
      </Document>
    </div>
  );
};

export const PdfPreview = memo(PdfToPngConverter, areEqualFileProp);
