import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Style from "../styles/Default.module.css";
const Default = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);
export default Default;
