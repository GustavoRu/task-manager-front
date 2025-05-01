import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

export default function LineChart(props) {
  const { dataInflation, setDataInflation } = props;
  const [dataLine, setDataLine] = useState([
    {
      id: "Inflation",
      color: "hsl(0, 100%, 50%)", // Color rojo en HSL
      data: [
        { x: "Enero", y: 1.2 },
        { x: "Febrero", y: 1.5 },
        { x: "Marzo", y: 2.1 },
        { x: "Abril", y: 1.8 },
        { x: "Mayo", y: 2.3 },
        { x: "Junio", y: 2.0 },
        { x: "Julio", y: 0 },
        { x: "Agosto", y: 0 },
        { x: "Septiembre", y: 0 },
        { x: "Octubre", y: 0 },
        { x: "Noviembre", y: 0 },
        { x: "Diciembre", y: 0 },
      ],
    },
  ]);

  const fetchDataInflation = () => {
    fetch(
      "https://api.bcra.gob.ar/estadisticas/v2.0/datosvariable/27/2024-01-01/2024-12-30"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.json();
      })
      .then((response) => {
        if (response.status == 200) {
          setDataInflation(response.results);
        } else {
        }

        // setLoading(false);
      })
      .catch((error) => {
        setErrorInflation(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataInflation();
  }, []);

  useEffect(() => {
    let dataLineAux = [...dataLine];
    let dataInflationAux = [...dataInflation];
    dataInflationAux.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    // let dataArrAux =
    // console.log("dataLineAux", dataLineAux);
    dataInflationAux.forEach((el, index) => {
      dataLineAux[0].data[index].y = el.valor;
    });
    setDataLine(dataLineAux);
  }, [dataInflation]);

  return (
    <div
      style={{
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResponsiveLine
        data={dataLine}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Mes",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Inflación mensual (%)",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={["#FF6B6B"]} // Cambiar esquema de color a tonos de rojo
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        theme={{
          axis: {
            ticks: {
              text: { fill: "#ffff" }, // Color del texto de los ejes
            },
            legend: {
              text: {
                fill: "#ffff", // Color del texto de las leyendas
              },
            },
          },
        }}
      />
    </div>
  );
}
