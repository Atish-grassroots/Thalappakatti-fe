import React, { createContext, useContext } from "react";
import { Table } from "@tanstack/react-table";

export const AdvanceTableContext = createContext({});

const AdvanceTableProvider = ({ children, ...rest }) => {
  return (
    <AdvanceTableContext.Provider value={{ ...rest }}>
      {children}
    </AdvanceTableContext.Provider>
  );
};

export const useAdvanceTableContext = () => useContext(AdvanceTableContext);

export default AdvanceTableProvider;
