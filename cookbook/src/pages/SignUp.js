import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sign_in.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';
import bcrypt from "bcryptjs-react";

const SignIn = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = window.location.href;

  async function submit(e) {
    e.preventDefault();

    try {
      console.log(url);

      if(password.length<=5 || password.indexOf(" ")!=-1){
        alert("A password must contain minimum 6 characters, and can include no spaces");
      }
      else{
        const salt = await bcrypt.genSalt(); // Await to get the salt
      const hashed = await bcrypt.hash(password, salt); // Hash the password with the salt
     

      await axios.post(url, {
        email,
        hashed
      })
      .then(res => {
        console.log(res)
        if (res.data === "exist") {
          alert("An account with that email already exists");
        }
        else if (res.data === "none_exist") {
          history("/signin");
        }
        
      })
      .catch(e => {
        alert("Wrong details");
        console.log(e);
      });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Navbar />
      <div className="signin">
        <div className="container">
          <div className="login-form">
            <h2>Sign Up</h2>
            <div className="formData">
              <form action="POST">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                <div className="buttons">
                  <Link to="/">
                    <input type="button" value="Cancel" id="cancel" />
                  </Link>
                  <input type="submit" value="Sign Up" id="save" name="save" onClick={submit} />
                </div>
              </form>

              <br />
              <p>OR</p>
              <Link to="/signin">
                <input type="button" value="Sign in" id="cancel" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
