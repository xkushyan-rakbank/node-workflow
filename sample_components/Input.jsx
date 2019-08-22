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

function renderDatalist(field) {
  if (field.hasOwnProperty('datalist') && field.datalist !== '') {
    let optionItems = field.datalist.map((item) =>
      <option key={item.value}>{item.label}</option>
    );
    return (
      <datalist id={field.id + '_list'}>
        {optionItems}
      </datalist>
    );
  }
}

function validateInputValue(){
  
}


function Input({ id, indexes, reducerActionType, divClass }) {
  const { state, dispatch } = useContext(AppContext);
  console.log(state);

  const field = state.uiConfig[id];
  const newId = (indexes !== null && indexes !== undefined) ? id + '_' + indexes : id;
  let newPath = field.path;
  if (indexes !== undefined) {
    let indexesArr = indexes.split('_');
    indexesArr.forEach(function (index) {
      newPath = newPath.replace('*', index);
    });
  }

  let value = jp.value(state, newPath);

  const handleInputChange = (event) => {
    if (reducerActionType !== null && reducerActionType !== undefined) {
      dispatch({ type: reducerActionType, event });
    } else {
      let newState = { ...state };
      let newValue = jp.value(newState, newPath, event.target.value);
      dispatch({ type: 'SET_INPUT_VALUE', newState: newState });
      console.log("handleInputChange " + event.target.id + " " + event.target.value);
      console.log('newValue ' + newValue);
      console.log(newState);
    }
  };

  divClass = (divClass === undefined || divClass === '') ? "form-group" : divClass;

  const attr = {
    "id": newId,
    "type": "input",
    "value" : value,
    "name": field.name,
    "placeholder": field.placeholder,
    "onChange": field.hasOwnProperty('onchange') ? field.onchange : handleInputChange,
    "onBlur": field.hasOwnProperty('onblur') ? field.onblur : validateInputValue,
    "className": "form-control",
    "list": field.hasOwnProperty('datalist') ? id + '_list' : '',
    "size": field.hasOwnProperty('size') ? field.size : '',
    "min": field.hasOwnProperty('min') ? field.min : '',
    "max": field.hasOwnProperty('max') ? field.max : '',
    "maxLength": field.hasOwnProperty('maxlength') ? field.maxlength : '',
    "pattern": field.hasOwnProperty('pattern') ? field.pattern : '',
    ...(field.hasOwnProperty('required') && field.required) && { "required": true },
    ...(field.hasOwnProperty('disabled') && field.disabled) && { "disabled": true },
    ...(field.hasOwnProperty('readonly') && field.readonly) && { "readonly": true }
  }

  if (field.applicable) {
    return (
      <div className={divClass}>
        {renderLabel(field)}
        <input
          {...attr}
        />
        {renderDatalist(field)}
        {renderHelpBlock(field)}
      </div>
    );
  } else {
    return null;
  }
}

export default Input;
