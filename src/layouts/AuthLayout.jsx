import { Outlet } from "react-router-dom";
import PaidIcon from '@mui/icons-material/Paid';

export default function AuthLayout() {
  return (
    <main className="max-w-4xl m-auto mt-10 md:mt-24 flex flex-col md:flex-row items-center">
      {/* <img
        src="../../public/img/icons8-caja-de-dinero.svg"
        alt="Imagen app"
        className="max-w-xs"
        style={{ height: "200px" }}
      /> */}
      <PaidIcon sx={{ color: "#ffff", fontSize: "200px" }}/>

      {/* <a
        target="_blank"
        href="https://icons8.com/icon/2975/money-box"
        style={{ display: "none" }}
      >
        Caja de dinero
      </a> */}
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
}
