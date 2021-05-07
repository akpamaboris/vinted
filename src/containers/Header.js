import logo from "../vinted-logo.png";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = ({ userToken, setUser }) => {
  const [, setConnection] = useState(false);

  return userToken ? (
    <div>
      {console.log(Cookies.get("tokenVinted"))}
      <header>
        <Link to="/">
          <img src={logo} alt="Logo of Vinted" />
          <button
            onClick={() => {
              setUser(null);
              Cookies.remove("tokenVinted");
              setConnection(false);
            }}
          >
            Log Out
          </button>
        </Link>
      </header>
    </div>
  ) : (
    <div>
      <header>
        <Link to="/">
          <img src={logo} alt="Logo of Vinted" />
        </Link>
        <input type="text" />
        <Link to="/register">
          <button>S'inscrire</button>
        </Link>
        <Link to="/login">
          <button>Se connecter</button>
        </Link>
        <button>Vends tes articles</button>
      </header>
    </div>
  );
};

export default Header;
