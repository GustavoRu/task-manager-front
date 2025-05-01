import React, { useState } from "react";
import "./HomeExample.css";
export default function HomeExample() {
  const [grossSalary, setGrossSalary] = useState("");
  const [netSalary, setNetSalary] = useState(0);
  const dollarValue = 100; // Valor del dólar fijo para el ejemplo

  const calculateNetSalary = () => {
    const net = grossSalary * 0.8; // Ejemplo simple de cálculo
    setNetSalary(net.toFixed(2));
  };
  return (
    <div className="App">
      <header>
        <h1>Portal de Finanzas</h1>
      </header>

      <div className="section" id="dollar-section">
        <h2>Valor del Dólar</h2>
        <p>
          Valor actual: <span id="dollar-value">{dollarValue}</span> ARS
        </p>
      </div>

      <div className="section" id="salary-calculator">
        <h2>Calculadora de Sueldo Neto</h2>
        <div className="input-group">
          <label htmlFor="gross-salary">Sueldo Bruto (ARS):</label>
          <input
            type="number"
            id="gross-salary"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            placeholder="Ingrese su sueldo bruto"
          />
        </div>
        <button className="btn" onClick={calculateNetSalary}>
          Calcular
        </button>
        <p>
          Sueldo Neto: <span id="net-salary">{netSalary}</span> ARS
        </p>
      </div>

      <div className="section" id="login-section">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" placeholder="Ingrese su usuario" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button className="btn">Login</button>
      </div>
    </div>
  );
}
