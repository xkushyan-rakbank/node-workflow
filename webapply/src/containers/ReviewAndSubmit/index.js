import { connect } from "react-redux";

import { ReviewSubmit } from "./ReviewSubmit";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";

const mapDispatchToProps = { sendProspectToAPI: sendProspectToAPIPromisify };

export default connect(
  null,
  mapDispatchToProps
)(ReviewSubmit);
