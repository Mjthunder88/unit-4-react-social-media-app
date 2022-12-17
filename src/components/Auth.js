import { useState, useContext } from "react";

import axios from 'axios'
import AuthContext from "../store/authContext";

import Modal from "./Modal";


const Auth = () => {
  const authCtx = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [modal, setModal] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();

    const url = 'http://localhost:3002'  //! HAD TO ALSO CHANGE IT IN PACKAGE.JSON in PROXY section // and run front end on diff port

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
          toggleModal()
          console.log(error)
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


  

  const toggleModal = () => {
    setModal(!modal)
}

  if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
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
      <Modal modal={modal} toggleModal={toggleModal} />
    </main>
  );
};

export default Auth;
