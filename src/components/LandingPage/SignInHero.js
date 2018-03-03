import React, { Component } from 'react';
import './SignInHero.css'
export default class SignInHero extends Component {
  render() {
    return (
      <div className="heroContainer">
        <div className="inputContainer">
        <div className="leftSide">
          <p className="heroText headerText">Sign Up  </p>
          <p className="secondaryText">It's that easy.</p>
        </div>
        <div className="rightSide">
          <div>
            <div className="inputLabel">Email</div><input />
            <br />
            <div className="inputLabel">Password</div><input />
            <br />
            <div className="inputLabel">Confirm Password</div><input />
            <br />
          </div>  
            <button className="greenColor">Sign up</button>
            <img src="C:\repos\mountain-wiki\src\images\google.png"/>  
          <div className="inputLabel auth">Or sign in with Google / Github</div>
          </div>
        </div>  
        <div className="blackout">sdfsdf</div>
        <div className="heroImg"><img src="/images/heroimg.jpg" /></div>
        
      </div>
    );
  }
}