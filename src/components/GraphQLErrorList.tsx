import * as React from 'react';

const GraphQLErrorList = ({ errors }: { errors: Error[] }) => (
  <div>
    <h1>GraphQL Error</h1>
    {errors.map(error => (
      <pre key={error.message}>{error.message}</pre>
    ))}
  </div>
);

export default GraphQLErrorList;
