import logo from "../vinted-logo.png";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <Link to="/">
          <img src={logo} alt="Logo of Vinted" />
        </Link>
        <input type="text" />
        <button>S'inscrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
      </header>
    </div>
  );
};

export default Header;
