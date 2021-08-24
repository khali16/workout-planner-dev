import React, { useContext, useState } from "react";

const SpinnerContext = React.createContext();

export function useSpinner() {
  return useContext(SpinnerContext);
}

export function SpinnerProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const openSpinner = () => {
    setIsLoading(true);
  };
  const closeSpinner = () => {
    setIsLoading(false);
  };
  const value = {
    openSpinner,
    closeSpinner,
    isLoading,
  };

  return (
    <SpinnerContext.Provider value={value}>
      {" "}
      {children}{" "}
    </SpinnerContext.Provider>
  );
}
