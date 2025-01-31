'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type SwaggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Record<string, any>;
  url: string | undefined;
};

export default function ReactSwagger({ spec, url }: SwaggerProps) {
  if (process.env.NODE_ENV === 'development') {
    return <SwaggerUI spec={spec} />;
  } else {
    return <SwaggerUI url={url} />;
  }
}
