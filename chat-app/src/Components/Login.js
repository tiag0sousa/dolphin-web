import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../API/firebase'
import '../css/login.css'
import logo from '../Assets/FF.png';

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {

      let result = await signInWithEmailAndPassword(auth, email, password);

      handleLoginSuccess(result.user)
      
    } catch (error) {
      
      setError(error.message);
    }
  }

  return (

    <div class="container">
        <div class="form-section">
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>

                {error && <p class="error">Invalid credentials. Please try again</p>}
            </form>
        </div>
        <div class="image-section">
        </div>
    </div>
  );
}

export default Login;
