import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [status, setStatus] = useState("");

  function register(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/employee", {
        name: name,
        email: email,
        password: password,
        cpf: cpf,
        status: true,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={register}>
        <label>Informe o nome:</label>
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Informe o email:</label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Informe o senha:</label>
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>Informe o cpf:</label>
        <br />
        <input value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <br />
        <br />
        <button>Send</button>
        <br />
      </form>
    </div>
  );
}

export default App;
