import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";

type Props = {
  fallback?: string | React.ReactNode;
  children: React.ReactNode;
};

const RemoteWrapper: FC<Props> = ({ children, fallback = null }) => (
  <ErrorBoundary>
    <React.Suspense fallback={fallback}>{children}</React.Suspense>
  </ErrorBoundary>
);

export default RemoteWrapper;
