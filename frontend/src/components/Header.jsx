import { ShoppingCart, Home, List } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Style from "../styles/components/Header.module.css";
const Header = () => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  return (
    <form className={Style.mainActions} onSubmit={(e) => e.preventDefault()}>
      <button
        type="button"
        className={`${Style.btnAction} ${
          path == "/" ? Style.btnActionActive : ""
        }`}
        onClick={() => navigate("/")}
      >
        <Home />
      </button>
      <button
        type="button"
        className={`${Style.btnAction} ${
          path == "/ordenes" ? Style.btnActionActive : ""
        }`}
        onClick={() => navigate("/ordenes")}
      >
        <ShoppingCart />
      </button>
      <button
        type="button"
        className={`${Style.btnAction} ${
          path == "/productos" ? Style.btnActionActive : ""
        }`}
        onClick={() => navigate("/productos")}
      >
        <List />
      </button>
    </form>
  );
};

export default Header;
