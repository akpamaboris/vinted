import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = {
      email: email,
      username: username,
      phone: phone,
      password: password,
    };
    //   console.log(email, username, phone, password);
    axios
      .post("https://lereacteur-vinted-api.herokuapp.com/user/signup", form)
      .then((res) => {
        setStatusMessage(
          "Félicitations,vous voilà enregistrés🥳.Vous pouvez maintenant vous connecter."
        );
        setTimeout(() => {
          history.push("/login");
          window.location.reload(false);
        }, 2000);
      })
      .catch(function (error) {
        setStatusMessage("Désolé 😔l'email est déjà enregistré");
      });

    setEmail("");
    setUsername("");
    setPhone("");
    setPassword("");
  };
  return (
    <div className="form-main-register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-register">
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="on"
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="on"
          />
        </label>
        <label htmlFor="phone">
          phone
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="on"
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <label htmlFor="submit">
          Submit
          <input name="submit" type="submit" value="register" />
        </label>
      </form>
      <div style={{ color: "blue", paddingTop: "20px", fontSize: "30px" }}>
        {statusMessage ? statusMessage : null}
      </div>
    </div>
  );
};

export default Signup;
