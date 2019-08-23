import React, { useState, useContext } from "react";
import logo from './../logo.svg';
import './../App.css';
import { Router, Link } from "@reach/router"
import Textarea from "../components/Textarea";
import Input from './../components/Input';
import Select from './../components/Select';
import MultiSelect from './../components/MultiSelect';
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";

function Welcome() {
 // <Select id="UI0007" name="createdBy" ></Select>

 // <MultiSelect id="UI0008" name="lastModifiedBy" ></MultiSelect>

 // <RadioGroup id="UI0009" name="actionType" ></RadioGroup>

 // <CheckboxGroup id="UI0010" name="actionType" ></CheckboxGroup>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
       
        <Input id="UI0001" indexes='2' name="prospect.applicationInfo.viewId"></Input>
       
        <Input id="UI0002" name="prospect.applicationInfo.leadNumber" ></Input>

        <Textarea id="UI0003" name="prospect.applicationInfo.srNumber" ></Textarea>

       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <h1>Welcome</h1>
          <nav>
            <Link to="/">Welcome</Link> |{" "}
            <Link to="/applicant">Applicant Info</Link> |{" "}
            <Link to="/business">Business Info</Link>
          </nav>
        </div>

      </header>
    </div>
  );
}

export default Welcome;
