import { connect } from "react-redux";

import { StakeholdersPreview } from "./StakeholdersPreview";
import { sendProspectToAPIPromisify } from "../../../store/actions/sendProspectToAPI";

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

const StakeholderPreview = connect(
  null,
  mapDispatchToProps
)(StakeholdersPreview);

export default StakeholderPreview;
