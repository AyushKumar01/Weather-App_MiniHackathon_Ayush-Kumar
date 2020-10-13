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
      weather: [{}]
    }
  }
  
  componentDidMount(){
    this.getWeatherData();
  }

  getWeatherData = () => {
    axios
      .get(`${SEARCH_URL}${API_KEY}`)
      .then((response) =>
        this.setState({
          weatherData: response.data
        })
      );
      console.log(this.weatherData)
      // .catch((error) => {
      //   console.log(error)
      // });
  }
  // function drawWeather(d) {
  //   var celcius = Math.round(parseFloat(d.main.temp)-273.15);
  //   //var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  //   var description = d.weather[0].description; 
    
  //   document.querySelector('.header__right-description').innerHTML = description;
  //   document.getElementById('temp').innerHTML = celcius + '&deg;';
  //   document.getElementById('location').innerHTML = d.name;
    
  //   if( description.indexOf('rain') > 0 ) {
  //     document.body.className = 'rainy';
  //   } else if( description.indexOf('cloud') > 0 ) {
  //     document.body.className = 'cloudy';
  //   } else if( description.indexOf('sunny') > 0 ) {
  //     document.body.className = 'sunny';
  //   } else {
  //     document.body.className = 'clear';
  //   }
  // }
  
  render() {
    const { name, main, weather } = this.state.weatherData;
    let temperature = main.temp;
    let celsius = Math.round(parseFloat(temperature)-273.15);
    let status = weather[0].description;
    let now = new Date();
    let currentDate =  date.format(now, 'YYYY/MM/DD'); 
    // function trueTIME() {
    //   let know = new Date();
    //   let currentTime =  date.format(know, 'HH:mm:ss'); 
    //   exactTime 
    // } 
    // window.onload = function() {
    //   trueTIME();
    // }
    let know = new Date();
    let currentTime =  date.format(know, 'HH:mm:ss'); 
    return (
      <div className="background">
        <div className="header">
            <div className="header__left">
                <div className="header__left-description">{status}</div>
                <h1 className="header__left-temp" id="temp">{celsius}&deg;</h1>
                <div className="header__left-location" id="location">{name}</div>
            </div>
            <div className="header__box-wish">
                <p id="wishPara">good evening</p>
            </div>
            <div className="header__box">
                <p className="header__box-date">{currentDate}</p>
                <p className="header__box-time">{currentTime}</p>
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
