'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type SwaggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Record<string, any>;
};

export default function ReactSwagger({ spec }: SwaggerProps) {
  return <SwaggerUI spec={spec} />;
}
