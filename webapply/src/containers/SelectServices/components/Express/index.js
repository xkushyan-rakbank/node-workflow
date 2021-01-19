//ro-assist-brd3-17
import { connect } from "react-redux";

import { getIsIslamicBanking } from "../../../../store/selectors/appConfig";

import { ExpressServicesComponent } from "./Express";

const mapStateToProps = state => ({
  isIslamicBanking: getIsIslamicBanking(state)
});

export const ExpressServices = connect(mapStateToProps)(ExpressServicesComponent);
