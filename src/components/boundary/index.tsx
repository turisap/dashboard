import React from "react";
import LogRocket from "logrocket";
import { AiOutlineRocket } from "react-icons/ai";

import styles from "./styles.scss";

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    LogRocket.captureException(error, {
      tags: {
        stack: errorInfo.componentStack.toString(),
      },
      extra: {
        stack: errorInfo.componentStack.toString(),
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <AiOutlineRocket size={75} color={"#9a9a9a"} />
          <h1>Houston, we have a problem</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
