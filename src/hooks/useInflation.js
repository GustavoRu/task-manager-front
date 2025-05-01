import { useContext } from "react";
import InflationContext from "../context/InflationProvider";

const useInflation = () => {
  return useContext(InflationContext);
};

export default useInflation;
