import { ShoppingCart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Style from "../styles/components/Header.module.css";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <Link to={`/`}>
          <Home />
        </Link>
      </nav>
      <form onSubmit={(e) => e.preventDefault()}>
        <button type="button" onClick={() => navigate("/ordenes")}>
          <ShoppingCart />
        </button>
      </form>
    </header>
  );
};

export default Header;
