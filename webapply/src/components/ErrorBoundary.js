import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static defaultProps = {
    errorPlaceholder: null
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
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

export default ErrorBoundary;
