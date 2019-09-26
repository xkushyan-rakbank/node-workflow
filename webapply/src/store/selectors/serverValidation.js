/**
 * @param {Store} state
 * @return {ServerValidation}
 */
export const getServerValidation = state => state.serverValidation;
/**
 * @param {Store} state
 * @return {{String: ServerValidationInputData}}
 */
export const getServerValidationInputs = state => getServerValidation(state).inputs;
/**
 * @param {Store} state
 * @param {String} path
 * @return {ServerValidationInputData|null}
 */
export const getInputServerValidityByPath = (state, path) =>
  getServerValidationInputs(state)[path] || null;
