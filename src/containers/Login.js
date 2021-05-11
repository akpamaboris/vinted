import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Login = ({ userToken, setUser }) => {
  let history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    const form = { email: email, password: password };
    axios
      .post("https://lereacteur-vinted-api.herokuapp.com/user/login", form)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.token) {
          setErrorLogin(false);
          Cookies.set("tokenVinted", res.data.token, { expires: 1 });
          history.push("/");
          window.location.reload(false);
        } else {
        }
      })
      .catch((err) => {
        setErrorLogin(true);
      });

    setPassword("");
    setEmail("");
  };
  return (
    <div>
      <h1 style={{ marginLeft: "350px" }}>Login</h1>
      <form onSubmit={handleSubmit} className="form-login">
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={handleEmailChange}
          />
        </label>
        <label className="subm-cl" htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            name="password"
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </label>
        <label htmlFor="submit">
          Submit <input name="submit" type="submit" />
        </label>
      </form>
      {errorLogin ? (
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "20px",
            marginTop: "70px",
          }}
        >
          Désolé 😔 les identifiants ou mot de passe que tu as rentré ne
          fonctionnent pas
        </span>
      ) : null}
    </div>
  );
};

export default Login;
