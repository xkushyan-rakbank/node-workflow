import React from "react";
import Header from "./../components/Header";
import FormNavigation from "../components/FormNavigation";

const FormLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="formLayout">
        <div className="formWrapper">
          <div className="formInner">{children}</div>
        </div>

        <FormNavigation />
      </div>
    </React.Fragment>
  );
};

export default FormLayout;
