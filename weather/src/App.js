import React, { Component } from 'react'
import "./styles/app.css";
import { SEARCH_URL } from './constant';
import { API_KEY } from './constant';
import axios from "axios";
const date = require('date-and-time');

class App extends Component {
  state = {
    weatherData: {
      name: "",
      main: {},
      weather: [{}],
      currTime: "",
      wish: ""
    }
  }
  
  componentDidMount(){
    this.getWeatherData();
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      currTime: new Date().toLocaleTimeString()
    });
  }

  getWeatherData = () => {
    axios
      .get(`${SEARCH_URL}${API_KEY}`)
      .then((response) =>
        this.setState({
          weatherData: response.data
        })
      ).catch((error) => {
        console.log(error)
      });
  }
  getWish = () => {
    let today = new Date();
    let h = today.getHours();
    let wish = "";
    if (h < 12) {
      wish = 'Good morning';
    } else if (h < 18) {
      wish = 'Good afternoon';
    } else if (h < 20) {
      wish = 'Good evening';
    } else {
      wish = 'Good night';
    } 
    return wish;
  }
  render() {
    const { name, main, weather } = this.state.weatherData;
    let temperature = main.temp;
    let celsius = Math.round(parseFloat(temperature)-273.15);
    let status = weather[0].description;
    let now = new Date();
    let currentDate =  date.format(now, 'MM/DD/YYYY');
    let greet = this.getWish()
    return (
      <div className="background">
        <div className="header">
            <div className="header__left">
                <div className="header__left-description">{status}</div>
                <h1 className="header__left-temp" id="temp">{celsius}&deg;</h1>
                <div className="header__left-location" id="location">{name}</div>
            </div>
            <div className="header__box-wish">
                <p id="wishPara">{greet}</p>
            </div>
            {/* <div className="header__box"> */}
                <p className="header__box-time">{this.state.currTime}</p>
                <p className="header__box-date">{currentDate}</p>
            {/* </div> */}
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
