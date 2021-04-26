import { connect } from "react-redux";
import { InviteCustomer } from "./InviteCustomer";
import { inviteCustomerFormPromisify } from "../../../store/actions/agentFeatures";
import { getAgentName } from "../../../store/selectors/appConfig";
import { getRoCode } from "../../../store/selectors/loginSelector";

const mapDispatchToProps = {
  invite: inviteCustomerFormPromisify
};

const mapStateToProps = state => ({
  roAgentId: getAgentName(state),
  roCode: getRoCode(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteCustomer);
