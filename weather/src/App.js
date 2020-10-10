import React, { Component } from 'react'
import "./styles/app.css";
// import axios from "axios";

class App extends Component {
  render() {
    return (
      <div className="background">
        <div className="header">
            <div className="header__left">
                <div className="header__left-description">Few cloudy</div>
                <h1 className="header__left-temp" id="temp">17*C</h1>
                <div className="header__left-location" id="location">Vancouver</div>
            </div>
            <div className="header__box-wish">
                <p id="wishPara">good evening</p>
            </div>
            <div className="header__box">
                <p className="header__box-date">10/06/2020</p>
                <p className="header__box-time">18:39:47</p>
            </div>
        </div>
        <div className="bottom">        
          <div className="bottom__leftContainer">
              <h1 className="bottom__heading">Weather Point</h1>
              <form className="bottom__form">
                <input className="bottom__form-input" type="text" placeholder="Search for a city" autoFocus /><br></br>
                <button className="bottom__form-btn" type="submit">SUBMIT</button>
                <span className="bottom__form-msg"></span>
              </form>
          </div>
          <div id="weather_div"></div>
        </div>
    </div>
    )
  }
}
export default App;
