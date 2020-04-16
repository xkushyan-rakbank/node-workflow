import React from "react";
import { styled } from "@material-ui/styles";

import { log } from "../utils/loggger";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static defaultProps = {
    errorPlaceholder: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    log({ error, errorInfo });
  }

  render() {
    const { children, errorPlaceholder, className, ...rest } = this.props;

    let content = children;

    if (this.state.hasError) {
      content = errorPlaceholder;
    }

    if (className) {
      return (
        <div className={className} {...rest}>
          {content}
        </div>
      );
    }

    return content;
  }
}

export const ErrorBoundaryForReCaptcha = styled(ErrorBoundary)({
  display: "flex",
  paddingTop: "10px",
  maxWidth: "100%",
  justifyContent: "center"
});
