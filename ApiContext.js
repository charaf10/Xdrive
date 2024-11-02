// ApiContext.js
import React, { createContext, useContext } from 'react';
import { myip, mydbAPI } from './IP';  // Assurez-vous que le fichier `IP.js` existe et exporte les valeurs correctes

const ApiContext = createContext({
  baseURL: `http://${myip}:80/${mydbAPI}/`,
});

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const config = { baseURL: `http://${myip}:80/${mydbAPI}/` };
  return <ApiContext.Provider value={config}>{children}</ApiContext.Provider>;
};
