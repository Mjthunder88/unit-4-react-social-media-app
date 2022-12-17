import { useState, useContext } from "react";

import axios from 'axios'
import AuthContext from "../store/authContext";


const Auth = () => {
  const authCtx = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const url = 'http://localhost:3002'

    if (register) {
        axios.post(`${url}/register`, {
            username,
            password
        })
        .then((res) => {
            console.log(res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error creating your account')
        })
    } else {
        axios.post(`${url}/login`, {
            username,
            password
        })
        .then((res) => {
            console.log(res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
        })
        .catch((error) => {
            console.log(error)
        })
        
    }
    setPassword('')
    setUsername('')

    console.log("submitHandler called");
  };

  const usernameHandler = (event) => {
    // console.log(event.target.value)
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const changeBtnHandler = (event) => {
    setRegister(!register)
  }


  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={usernameHandler}
        />
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={passwordHandler}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={changeBtnHandler}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
