import React from 'react';
import { createContext } from 'react';
import { NetworkConfig } from 'utils/configUtils';

export const ConfigContext = createContext<NetworkConfig | Record<string, never>>({});

const ConfigProvider = ({ value, children }) => {
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
