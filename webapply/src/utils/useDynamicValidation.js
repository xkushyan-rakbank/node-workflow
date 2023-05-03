import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export default function useDynamicValidation() {
  const inputBehaviour = useSelector(state => state.inputFieldBehaviours);

  const conditionalSchema = useCallback(
    schema => {
      const schemaCopy = cloneDeep(schema);
      Object.keys(schema).forEach(key => {
        const findElement = Object.keys(inputBehaviour).filter(
          behaviour => behaviour.split(".").pop() === key
        )[0];
        const isVisible = inputBehaviour[findElement]?.visible;
        if (isVisible === false) {
          delete schemaCopy[key];
        }
      });
      return Yup.object(schemaCopy);
    },
    [inputBehaviour]
  );

  return conditionalSchema;
}
