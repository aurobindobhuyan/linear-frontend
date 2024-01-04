import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
   return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Error caught by error boundary:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return (
        <div>
          <h1>Something went wrong. Please try again later.</h1>
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
