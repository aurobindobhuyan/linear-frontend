import { Component, ReactNode } from "react";
import { Button } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: null | Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.setState({ hasError: true, error });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return (
        <div>
          <h1>
            {this.state?.error?.message ||
              "Something went wrong. Please try again later."}
          </h1>
          <Button
            variant="contained"
            color="error"
            onClick={() => window.location.replace("/")}
          >
            Reload
          </Button>
        </div>
      );
    }

    // Render the child components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
