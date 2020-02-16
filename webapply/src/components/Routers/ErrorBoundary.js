import React, { PureComponent } from "react";

class ErrorBoundary extends PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <>
          <h3>Error occured</h3>
          <pre>{error.toString()}</pre>
        </>
      );
    }
    return children;
  }
}

export { ErrorBoundary };
