import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  /** When this key changes, the error boundary resets (e.g. pass `location`) */
  resetKey?: string;
}

interface State {
  hasError: boolean;
  lastResetKey?: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, lastResetKey: props.resetKey };
  }

  static getDerivedStateFromError(_error: unknown): Partial<State> {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    // Reset when the navigation key changes (e.g. user navigated to a new page)
    if (props.resetKey !== state.lastResetKey) {
      return { hasError: false, lastResetKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(error: unknown, info: { componentStack?: string | null }) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{ background: "var(--joe-bg-solid)" }}
        >
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#48F2FB]/10 border border-[#48F2FB]/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-[#48F2FB]" />
            </div>
            <h2 className="font-heading font-bold text-joe-text text-2xl mb-2">
              Something went wrong
            </h2>
            <p className="text-joe-text/50 text-sm mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold gap-2"
              data-testid="button-error-reload"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
