import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Login = ({ userToken, setUser }) => {
  let history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
          Cookies.set("tokenVinted", res.data.token, { expires: 1 });
          history.push("/");
          window.location.reload(false);
        }
      });

    setPassword("");
    setEmail("");
  };
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label for="email">
          email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label for="password">
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </label>
        Submit <input name="submit" type="submit" />
      </form>
    </div>
  );
};

export default Login;
