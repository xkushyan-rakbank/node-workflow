import { connect } from "react-redux";
import { getDatalist } from "../../store/selectors/appConfig";

import { PersonaSelection as PersonaComponent } from "./PersonaSelection";

const mapStateToProps = state => ({
  datalist: getDatalist(state)
});

export default connect(mapStateToProps)(PersonaComponent);
