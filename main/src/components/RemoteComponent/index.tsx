import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { loadComponent } from "../../utils";

type Props = {
  fallback?: string | React.ReactNode;
  remote: "PRODUCTS";
  component: string;
  scope?: string;
};

const urls = {
  PRODUCTS: process.env.PRODUCTS_HOST,
};

const RemoteWrapper: FC<Props> = ({
  remote,
  component,
  scope = "default",
  fallback = null,
}) => {
  const Component = React.lazy(
    loadComponent(remote, urls[remote], `./${component}`, scope)
  );
  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default RemoteWrapper;
