import React from 'react';

const ErrorMsg: React.FC = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className="error">{children}</div>;
};

export default ErrorMsg;
