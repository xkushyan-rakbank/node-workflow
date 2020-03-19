import pick from "lodash/pick";
import { FIELDS } from "./constants";

export const pickFields = item => pick(item, FIELDS);
