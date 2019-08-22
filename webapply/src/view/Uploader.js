import React from "react";
import { Col, Jumbotron } from "react-bootstrap";

import FileUploader from "./../components/FileUploader/FileUploader";

const uploaderStyle = {
  margin: "40px 0"
};

const Uploader = props => {
  return (
    <Col md={{ span: 4, offset: 4 }}>
      <Jumbotron>
        <h3>File Uploader</h3>
        <form style={uploaderStyle}>
          <FileUploader />
        </form>
      </Jumbotron>
    </Col>
  );
};

export default Uploader;
