import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MutationObserver from "mutation-observer";

configure({ adapter: new Adapter() });

global.MutationObserver = MutationObserver;
