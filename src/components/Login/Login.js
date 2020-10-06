import React, { Fragment, useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
import LoginUsuario from '../../Api/Login/LoginUsuario';

export default function Login(props) {
  const [cuit, setCuit] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return cuit.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const oLogin = {
      usuario: cuit,
      password: password,
    }

    const res = await LoginUsuario(oLogin)
    switch (res.status) {
      case 200:
        props.handleLogin(true, cuit);
        break;
      case 404:
        setError(res.data);
        break;
      default:
        break;
    }
  }

  return (
    <Fragment>
      <h1>LOGIN</h1>
      <form className="form" onSubmit={handleSubmit}>
        <FormGroup controlId="cuit" bsSize="large">
          <FormControl
            autoFocus
            type="number"
            value={cuit}
            placeholder="CUIT"
            onChange={e => setCuit(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormControl
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
        {error !== "" ? <label>{error}</label> : null}
      </form>
    </Fragment>
  );
}