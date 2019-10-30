import React from "react";
import routes from "../../routes";
import { Prompt } from "react-router-dom";

const refreshOrBrowserBackButtonListener = WrappedComponent => {
  return class Wrapper extends React.Component {
    componentDidMount() {
      window.addEventListener("beforeunload", this.handleBeforeunload);
      window.addEventListener("unload", this.handleUnload);
    }

    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.handleBeforeunload);
      window.removeEventListener("unload", this.handleUnload);
    }

    handleBeforeunload = e => {
      e.preventDefault();
      const confirmationMessage = "";
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };

    handleUnload = () => {
      console.log("handleUnload");
    };

    componentDidUpdate() {
      if (performance.navigation.type === 1) {
        this.props.history.push(routes.accountsComparison);
      }
    }

    render() {
      return (
        <>
          <Prompt
            when={false}
            message={location => `Are you sure you want to go to ${location.pathname}`}
          />
          <WrappedComponent />
        </>
      );
    }
  };
};

export default refreshOrBrowserBackButtonListener;
