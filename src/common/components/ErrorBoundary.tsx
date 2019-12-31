import React, {Component, FunctionComponent, ReactNode} from 'react';
import {logger} from 'utils/logger';
import {Event} from 'utils/event';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  Fallback?: FunctionComponent;
  children: ReactNode;
}

interface ErrorInfo {
  componentStack: string;
}

/**
 * @description Error Boundary
 * A component that can be used as a sort of "try/catch" for a react component
 * tree. If no 'fallback' prop is provided, a default UI will be rendered
 * (which should be customized). If a 'fallback' prop is supplied, it will be
 * rendered.
 *
 * See this SO for details on implementation: http://bit.ly/2u0KLzr
 *
 * @example this will render the default UI:
 *   <ErrorBoundary>
 *     <ComponentThatFailsDuringRender />
 *   </ErrorBoundary>
 *
 * @example this will render a supplied fallback UI:
 *   <ErrorBoundary fallback={MyFallbackComponent}>
 *     <ComponentThatFailsDuringRender />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * @param {ErrorBoundaryProps} props takes two props: Fallback and children.
   * The children prop represents the react component tree that the
   * ErrorBoundary surrounds. The Fallback prop is a function component that
   * will be used as a backup render when the ErrorBoundary is triggered.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  /**
   * @return {ErrorBoundaryState} The new state which will cause this
   * component to re-render and to show a fallback UI. This will catch any
   * error from a decendent component.
   */
  static getDerivedStateFromError(): ErrorBoundaryState {
    return {hasError: true};
  }

  /**
   * @description A callback method that logs all errors received in the
   * ErrorBoundary to the application logger. It is meant to perform side
   * effects, hence the error logging. Called *after* render phase.
   *
   * @param {Error} error The actual JS error that caused the runtime exception
   * @param {ErrorInfo} errorInfo contains the stack trace
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.event(
        Event.ERROR_BOUNDARY,
        `error='${error}' stackTrace='${errorInfo?.componentStack}'`,
    );
  }

  /**
   * @description This method will simply render the ErrorBoundary's children
   * when there are no errors. When an error occurs, this method will render
   * a fallback UI.
   *
   * @return {JSX.Element | ReactNode} The JSX of the children or the fallback
   */
  render(): JSX.Element | ReactNode {
    const {children, Fallback} = this.props;
    if (this.state.hasError) {
      return Fallback ? <Fallback /> : <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export {ErrorBoundary};
