// Login.js
import React, { useState, useContext } from 'react';
import { SessionContext } from '../session/SessionProvider';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {session, handleLogin } = useContext(SessionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello:{session?.username}</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
