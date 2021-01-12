import { connect } from "react-redux";
import { InviteCustomer } from "./InviteCustomer";
import { inviteCustomerFormPromisify } from "../../../store/actions/agentFeatures";

const mapDispatchToProps = {
  invite: inviteCustomerFormPromisify
};

export default connect(
  null,
  mapDispatchToProps
)(InviteCustomer);
