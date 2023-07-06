import { connect } from "react-redux";

import { AccountServices } from "./AccountServices";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify };

export default connect(
  null,
  mapDispatchToProps
)(AccountServices);
