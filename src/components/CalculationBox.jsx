import React from "react";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function CalculationBox(props) {
  const { dataInflation } = props;
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState("3"); // Por defecto 3 meses
  const [adjustedSalary, setAdjustedSalary] = useState(null);
  const [lastAvailableMonth, setLastAvailableMonth] = useState("");
  const [inflationRates, setInflationRates] = useState({ 3: 0, 6: 0, 12: 0 });

  const currentMonth = new Date().getMonth(); // Mes actual (0-11)
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const latestAvailableMonth =
    months[currentMonth - 1] || "Diciembre del año pasado";

  const handleSubmit = (e) => {
    e.preventDefault();
    const rate = inflationRates[period];
    const newSalary = parseFloat(salary) * (1 + rate);
    setAdjustedSalary(newSalary.toFixed(2));
  };

  useEffect(() => {
    if (dataInflation.length > 0) {
      // Determinar el mes más reciente disponible
      const latestDate = dataInflation.reduce((latest, current) => {
        return new Date(current.fecha) > new Date(latest.fecha)
          ? current
          : latest;
      });

      // Formatear la fecha para mostrar solo el mes y el año
      const options = { year: "numeric", month: "long" };
      const formattedDate = new Date(latestDate.fecha).toLocaleDateString(
        "es-ES",
        options
      );
      setLastAvailableMonth(formattedDate);

      // Ordenar los datos de inflación por fecha descendente
      const sortedData = dataInflation.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );

      // Calcular tasas de inflación acumuladas
      const getCumulativeInflation = (months) => {
        const relevantData = sortedData.slice(0, months);
        const totalInflation = relevantData.reduce(
          (total, entry) => total + entry.valor,
          0
        );
        return totalInflation / 100; // Convertir a decimal
      };

      // Actualizar las tasas de inflación acumuladas para los últimos 3, 6 y 12 meses
      setInflationRates({
        3: getCumulativeInflation(3),
        6: getCumulativeInflation(6),
        12: getCumulativeInflation(12),
      });
    }
  }, [dataInflation]);

  return (
    <div className="bg-gray-100 dark:bg-neutral-800 flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
        Ajuste Salarial
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        Calcula tu nuevo sueldo en base a la inflación
      </p>
      <div className="bg-white dark:bg-neutral-700 shadow-md rounded-md mt-2 px-4 py-8 w-full max-w-md">
        {/* Información adicional */}
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md p-3 mb-4">
          <p>
            Inflación seleccionada:{" "}
            <span className="font-bold">
              {(inflationRates[period] * 100).toFixed(2)}%
            </span>
          </p>
          <p className="mt-1">
            Datos actualizados hasta:{" "}
            <span className="font-bold">{lastAvailableMonth}</span>
            <Tooltip
              title="Los datos de inflación pueden tardar hasta 15 días posteriores al mes corriente en publicarse por el INDEC."
              arrow
            >
              <IconButton className="ml-1 bg-transparent p-0">
                <InfoIcon color="inherit" fontSize="small" />
              </IconButton>
            </Tooltip>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="text-slate-800 dark:text-gray-300"
              htmlFor="salary"
            >
              Tu Sueldo Actual:
            </label>
            <input
              id="salary"
              type="number"
              value={salary}
              required
              onChange={(e) => setSalary(e.target.value)}
              className="mt-1 w-full p-2 bg-gray-100 dark:bg-neutral-600 dark:text-white dark:placeholder-gray-400"
              name="salary"
              placeholder="Ingresa tu sueldo actual"
            />
          </div>
          <div className="mb-3">
            <label
              className="text-slate-800 dark:text-gray-300"
              htmlFor="period"
            >
              Selecciona un período:
            </label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="mt-1 w-full p-2 bg-gray-100 dark:bg-neutral-600 dark:text-white"
            >
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="12">Último año</option>
            </select>
          </div>
          <input
            type="submit"
            value="Calcular Nuevo Sueldo"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-4 p-2 uppercase font-bold cursor-pointer"
          />
        </form>
        {adjustedSalary && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
            <p>
              Tu sueldo ajustado es:{" "}
              <span className="font-bold">${adjustedSalary}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
