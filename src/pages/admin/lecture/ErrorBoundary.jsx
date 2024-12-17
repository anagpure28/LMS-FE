import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong!
          </h2>
          <p className="text-gray-500">
            We encountered an issue while loading the lectures. Please try again
            later.
          </p>
        </div>
      );
    }

    // Render child components if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
