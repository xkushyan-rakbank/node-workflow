import React, { memo, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { isMobile } from "react-device-detect";
import { FixedSizeList } from "react-window";
import { useStyles } from "./styled";

function areEqualFileProp(prefFile, nextFile) {
  return prefFile.file === nextFile.file && prefFile.pages === nextFile.pages;
}

const PageView = ({ index, style }) => (
  <div style={{ ...style, width: "auto" }}>
    <Page
      key={`page_${index + 1}`}
      pageNumber={index + 1}
      devicePixelRatio={1}
      scale={isMobile ? undefined : 1.75}
    />
  </div>
);

const PdfToPngConverter = ({ file, pages = [] }) => {
  const PREVIEW_HEIGHT = window.innerHeight * 0.8;

  const classes = useStyles();
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line max-len
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={file} className={classes.previewPDF} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages && (
          <FixedSizeList
            height={PREVIEW_HEIGHT}
            itemSize={isMobile ? 420 : 1060}
            itemCount={numPages}
          >
            {PageView}
          </FixedSizeList>
        )}
      </Document>
    </div>
  );
};

export const PdfPreview = memo(PdfToPngConverter, areEqualFileProp);
