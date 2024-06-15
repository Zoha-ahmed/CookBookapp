import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sign_in.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';

const SignIn = () => {

  const history=useNavigate();
  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');
  const url =   window.location.href;


  async function submit(e){
    e.preventDefault();
    try{
        await axios.post("/signin",{
          email,password
        })
        .then(res=>{
          if(res.data=="exist_correct"){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('email', email);
            history("/recipes")
          } else if(res.data=="none_exist"){
            alert("Incorrect email or password")
          }
        })
        .catch(e=>{
          alert("Error")
          console.log(e)
        })
    }
    catch(e){
      console.log(e);

    }
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="signin">
        <div className="container">
          <div className="login-form">
            <h2>Sign in</h2>
            <div className="formData">
              <form action = "POST">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                onChange={(e) =>{setEmail(e.target.value)}}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                onChange={(e) =>{setPassword(e.target.value)}}
              />
              <div className="buttons">
                <Link to="/">
                  <input type="button" value="Cancel" id="cancel" />
                </Link>
                  <input type="submit" value="Sign In" id="save" name="save" onClick={submit}/>
              </div>
              </form>

              <br/>
              <p>OR</p>
            <Link to="/signup">
            <input type="button" value="Signup" id="cancel" />
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
