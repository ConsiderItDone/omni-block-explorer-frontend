import React from 'react';

export default function PG() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  return <div />;
}
