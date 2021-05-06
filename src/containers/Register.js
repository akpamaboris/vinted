import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = {
      email: email,
      username: username,
      phone: phone,
      password: password,
    };
    console.log(email, username, phone, password);
    axios
      .post("https://lereacteur-vinted-api.herokuapp.com/user/signup", form)
      .then((res) => {
        console.log(res);
        console.log(res.data);
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
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label htmlFor="phone">
          phone
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
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
    </div>
  );
};

export default Signup;
