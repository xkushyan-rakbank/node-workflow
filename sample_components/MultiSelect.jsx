import React, { useContext, useState } from "react";
import './../App.css';
import AppContext from "./../AppContext";
const jp = require('jsonpath');

function renderLabel(field) {
  if (field.hasOwnProperty('label') && field.label !== null && field.label !== '') {
    return <label htmlFor={field.id}>{field.label}</label>
  }
}

function renderHelpBlock(field) {
  if (field.hasOwnProperty('help') && field.help !== null && field.help !== '') {
    return <small id="{field.id}Help" className="form-text text-muted">
      {field.help}
    </small>
  }
}

function renderOptions(field) {
  if (field.hasOwnProperty('datalist') && field.datalist !== '') {
    let optionItems = field.datalist.map((item) =>
      <option value={item.value} key={item.value}>{item.label}</option>
    );
    return optionItems;
  }
}


function MultiSelect({ id, indexes, reducerActionType, divClass }) {
  const { state, dispatch } = useContext(AppContext);
  console.log(state);

  const field = state.appConfig[id];
  const newId = (indexes !== null && indexes !== undefined) ? id + '_' + indexes : id;
  let newPath = field.path;
  if (indexes !== undefined) {
    let indexesArr = indexes.split('_');
    indexesArr.forEach(function (index) {
      newPath = newPath.replace('*', index);
    });
  }

  let value = jp.value(state, newPath);

  console.log(newId + "  >> " + value);

  const handleMultiSelectChange = (event) => {
    if (reducerActionType !== null && reducerActionType !== undefined) {
      dispatch({ type: reducerActionType, event });
    } else {
      var target = event.target;
      var selectedOptions = [];
      for (var i = 0; i < target.length; i++) {
        if (target.options[i].selected) {
          selectedOptions.push(target.options[i].value);
        }
      }
      // not supported in IE
      //var selectedOptions = event.target.tags.selectedOptions;

      let newState = { ...state };
      let newValue = jp.value(newState, newPath, selectedOptions);
      dispatch({ type: 'SET_INPUT_VALUE', newState: newState });
      console.log("handle select change event " + event.target.id + " " + event.target.value);
      console.log(event);
      console.log(newState);
    }
  };

  const validateInputValue = (event) => {

  }

  divClass = (divClass === undefined || divClass === '') ? "form-group" : divClass;

  const attr = {
    "id": newId,
    "value": value,
    "name": field.name,
    "multiple": true,
    "placeholder": field.placeholder,
    "onChange": field.hasOwnProperty('onchange') ? field.onchange : handleMultiSelectChange,
    "onBlur": field.hasOwnProperty('onblur') ? field.onblur : validateInputValue,
    "className": "form-control",
    "size": field.hasOwnProperty('size') ? field.size : '',
    ...(field.hasOwnProperty('required') && field.required) && { "required": true },
    ...(field.hasOwnProperty('disabled') && field.disabled) && { "disabled": true },
    ...(field.hasOwnProperty('readonly') && field.readonly) && { "readonly": true }
  }

  if (field.applicable) {
    return (
      <div className={divClass}>
        {renderLabel(field)}
        <select multiple={true}
          {...attr}
        >
          {renderOptions(field)}
        </select>

        {renderHelpBlock(field)}
      </div>
    );
  } else {
    return null;
  }
}

export default MultiSelect;
