//ro-assist-brd3-17
import { connect } from "react-redux";

import { getIsIslamicBanking, getExpressTandC } from "../../../../store/selectors/appConfig";

import { ExpressServicesComponent } from "./Express";

const mapStateToProps = state => ({
  isIslamicBanking: getIsIslamicBanking(state),
  expressTandC: getExpressTandC(state)
});

export const ExpressServices = connect(mapStateToProps)(ExpressServicesComponent);
