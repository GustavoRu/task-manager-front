import clientAxios from "../config/axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { dollarRates as dollars } from "../data/dollarRates";

const InflationContext = createContext();

const InflationProvider = ({ children }) => {
  const [dollarRates, setDollarRates] = useState([]);

  const getDollarRates = async () => {
    try {
      const { data } = await clientAxios(`/api/dollars`);
      setDollarRates(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDollarRates();
  }, []);

  return (
    <InflationContext.Provider value={{ dollarRates }}>
      {children}
    </InflationContext.Provider>
  );
};

export { InflationProvider };

export default InflationContext;
