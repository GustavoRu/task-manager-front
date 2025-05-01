import { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import CurrencyBox from "../components/CurrencyBox";
import CalculationBox from "../components/CalculationBox";
import useInflation from "../hooks/useInflation";

export default function Home(props) {
  const { dollarRates } = useInflation(); //fines didacticos de practica con context
  const [dataDollars, setDataDollars] = useState([]);
  const [dataInflation, setDataInflation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorInflation, setErrorInflation] = useState(null);

  const fetchDataDollars = () => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.json();
      })
      .then((data) => {
        setDataDollars(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // console.log("hola", hola);
    fetchDataDollars();
    // fetchDataInflation();
  }, []);
  return (
    <div className="min-h-screen bg-[#1a202c] dark:bg-[#1a202c] p-7">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <CalculationBox dataInflation={dataInflation} />
          <LineChart
            dataInflation={dataInflation}
            setDataInflation={setDataInflation}
          />
        </div>
        {/* Elimina grid-rows-3 y h-[90vh] */}
        {/* Primera fila */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
          </div> */}
        {/* Segunda fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataDollars.map((dollar, index) => {
            return (
              <CurrencyBox
                key={"dollar" + index}
                type={dollar.casa}
                buyPrice={dollar.compra}
                sellPrice={dollar.venta}
                spread={Math.round(dollar.venta - dollar.compra)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
