import { connect } from "react-redux";

import { FaceRecognition } from "./FaceRecognition";
import { sendEFRInvitePromisify } from "../../store/actions/kyc";

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  sendInviteEFR: sendEFRInvitePromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceRecognition);
