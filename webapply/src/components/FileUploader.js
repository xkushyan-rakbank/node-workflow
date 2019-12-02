import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

import { uploadFile } from "../store/actions/uploadFile";

function FileUploader(props) {
  const { loading, error, uploadFile } = props;

  const uploadFileButton = event => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    uploadFile(data);
  };

  return (
    <>
      <Form.Control type="file" label="Upload" onChange={uploadFileButton} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </>
  );
}

const mapStateToProps = state => {
  const {
    uploadFile: { loading, error }
  } = state;
  return { loading, error };
};

const mapDispatchToProps = {
  uploadFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploader);
