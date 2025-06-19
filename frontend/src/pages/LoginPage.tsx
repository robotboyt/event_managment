import React, { SetStateAction, useState } from "react";
import "../styles/LogInPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("login");
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPass, setInputPass] = useState<string>("");
  const [loggined, setLoggined] = useState<string>("");

  let data;

  const logInFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: inputName,
        password: inputPass,
      });
      setLoggined("Loggined!!!");
      localStorage.setItem("token", `${res.data.access}`);
      localStorage.setItem("user", `${inputName}`);
      navigate("/");
    } catch (err) {}
  };

  console.log("user", localStorage.getItem("user"));

  const createUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: inputName,
        email: inputEmail,
        password: inputPass,
      });

      setLoggined("Created");
      if (res.status === 201) {
        logInFormSubmit(e);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginblock">
      <div>{loggined}</div>
      <div className="buttons-block">
        <button onClick={() => setTab("login")}>Log In</button>
        <button onClick={() => setTab("create")}>Create Account</button>
      </div>
      {tab === "login" ? (
        <form data-tab="login" onSubmit={logInFormSubmit}>
          <input
            placeholder="User name"
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          ></input>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setInputPass(e.target.value)}
            value={inputPass}
          ></input>
          <button type="submit">Log In</button>
        </form>
      ) : (
        <form data-tab="create" onSubmit={createUserSubmit}>
          <input
            placeholder="User name"
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          ></input>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setInputEmail(e.target.value)}
            value={inputEmail}
          ></input>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setInputPass(e.target.value)}
            value={inputPass}
          ></input>
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
