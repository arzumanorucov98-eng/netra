import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyInfo } from '../firebase/api';
// Fallback local data if Firebase isn't ready
import { companyInfo as localCompanyInfo } from '../data/content';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState(localCompanyInfo);

  useEffect(() => {
    getCompanyInfo().then(data => {
      if (data) setCompanyInfo(data);
    }).catch(err => console.error("Error fetching company info:", err));
  }, []);

  return (
    <DataContext.Provider value={{ companyInfo }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
