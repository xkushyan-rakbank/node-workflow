import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";

import { decisionTriggerFields } from "../config/decisionsConfig.json";
import { triggerDecisions } from "../store/actions/decisions";

export default function useDecisions(path) {
  const inputFieldBehaviours = useSelector(state => state.inputFieldBehaviours);
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();
  const decisions = {
    enabled: true,
    visible: true,
    label: "",
    makeDecisions: null
  };

  let dependantFields = [];

  //callback from the saga which has the object with changed values as path: value pair
  const callbackValuesChanged = changedFieldValues => {
    const newValues = {};
    Object.keys(changedFieldValues).forEach(path => {
      let key = path.split(".").pop();
      if (values.hasOwnProperty(key)) {
        newValues[key] = changedFieldValues[path];
      }
    });

    //setting it to the form
    Object.keys(newValues).length &&
      Object.keys(newValues).forEach(key => {
        setFieldValue(key, newValues[key]);
      });
  };

  // function is triggered when an onChange event is triggered on a decisionTrigger field
  function updatePropspectandUI(value) {
    dispatch(
      triggerDecisions({
        onValuesChanged: callbackValuesChanged,
        inputFields: {
          decision_input: [
            {
              input_key: path,
              input_value: value
            },
            ...dependantFields
          ]
        }
      })
    );
  }

  //hide or show / enable or disable the item based on the inputFieldBehaviour
  if (inputFieldBehaviours[path]) {
    const getBehaviour = inputFieldBehaviours[path];
    if (!getBehaviour.visible) {
      decisions.visible = false;
    }
    if (!getBehaviour.enabled) {
      decisions.enabled = false;
    }
  }

  if (decisionTriggerFields[path]) {
    dependantFields = decisionTriggerFields[path].dependantFields.map(dependantField => {
      let key = dependantField.split(".").pop();
      return {
        input_key: dependantField,
        input_value: values[key] || null
      };
    });
    decisions.makeDecisions = updatePropspectandUI;
  }
  //   console.log(decisions, "decisionss")
  return decisions;
}