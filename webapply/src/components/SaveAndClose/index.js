import { connect } from "react-redux";

import { SaveAndClose } from "./SaveCloseComponent/SaveAndClose";
import { prospectSaveOnClickPromisfy } from "../../store/actions/sendProspectToAPI";

const mapDispatchToProps = { prospectSaveOnClick: prospectSaveOnClickPromisfy };

export default connect(
  null,
  mapDispatchToProps
)(SaveAndClose);
