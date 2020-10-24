import React, { Component } from 'react'
import "./styles/app.css";
import { SEARCH_URL } from './constant';
import { URL } from './constant';
import { API_KEY } from './constant';
import { ICON_URL } from './constant';
import axios from "axios";
// import { format } from 'timeago.js';
const date = require('date-and-time');

class App extends Component {
  state = {
    weatherData: {
      name: "",
      main: {},
      weather: [{}],
      currTime: "",
      wind: {},
      sys: {},
      wish: ""
    },
    secondWeatherData: {
      name: "",
      sys: {},
      weather: [{}],
      main: {},
      wind: {}
    },
    errMsg: ""
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
  getSecondWeatherData = (event) => {
    event.preventDefault();
    const { name } = event.target;
    let postName = name.value;
    axios
    .post(`${URL}${postName}&appid=${API_KEY}&units=metric`)
    .then((response) => {
      // console.log(response);
      this.setState({
        secondWeatherData: response.data
      })
    }
    ).catch((error) => {
      if(error.response){
        this.setState({
          errMsg: error.response.data.message
        })
      }
      // this.setState({
      //   errMsg: error.response.data.message
      // })
      // console.log(error)
    });
    event.target.name.value = " ";
  }
  uppercase = (str) =>{
    if(str){
      let array1 = str.split(' ');
      let newArray1 = [];
      for(let i = 0; i < array1.length; i++){
        newArray1.push(array1[i].charAt(0).toUpperCase()+array1[i].slice(1));
      }
      return newArray1.join(' ');
    }
  }
  converter = (temp) => {
     let newValue = Math.round(parseFloat(temp)-273.15);
     return newValue;
  }
  render() {
    const { name, main, weather, wind, sys } = this.state.weatherData;
    let temperature = main.temp;
    let feels = main.feels_like;
    let temp_min = main.temp_min;
    let temp_max = main.temp_max;
    let pressure = main.pressure;
    let humidity = main.humidity;
    let windSpeed = wind.speed;
    let Sunrise = sys.sunrise;
    const timeStamp = new Date(Sunrise*1000);
    let Sunset = sys.sunset;
    const timeStampSunset = new Date(Sunset*1000);
    let currentRise = date.format(timeStamp, 'HH:mm');
    let currentSet = date.format(timeStampSunset, 'HH:mm');
    // ===================

    let status = this.uppercase(weather[0].description);
    let now = new Date();
    let currentDate =  date.format(now, 'MM/DD/YYYY');
    let greet = this.getWish()
    // =========2nd==============
    const { name: newName, sys: newSys, main: newMain, weather: newWeather, wind: newWind } = this.state.secondWeatherData;
    let country = newSys.country; 
    let newCelsius = newMain.temp;
    let newCelsiusSecond = newMain.temp && Math.floor(newMain.temp);
    const { icon }  = newWeather[0];
    const image1 = icon && `${ICON_URL}${icon}.svg`;
    let secondDescription = this.uppercase(newWeather[0].description);
    let feelsLike = newMain.feels_like;
    let tempMin = newMain.temp_min;
    let tempMax = newMain.temp_max;
    let speed = newWind.speed;
    let newHumidity = newMain.humidity;
    let newPressure = newMain.pressure;
    let newSunrise = newSys.sunrise;
    const newTimeStamp = new Date(newSunrise*1000);
    let newSunset = newSys.sunset;
    const newTimeStampSunset = new Date(newSunset*1000);
    let newCurrentRise = date.format(newTimeStamp, 'HH:mm');
    let newCurrentSet = date.format(newTimeStampSunset, 'HH:mm');
    
    return (
      <div className="background"> 
        <div className="main-wrapper">
              <div className="upper-wrapper">
                <div className="header">
                    <div className="header__left">
                        <div className="header__left-location">{name}</div>
                        <h1 className="header__left-temp">{this.converter(temperature)}&deg;</h1>
                        <div className="header__left-description">{status}</div>
                    </div>
                    <div className="header__mid">
                        <div className="header__right-feel">Feels Like - {this.converter(feels)}&deg;</div>
                        <div className="header__right-min">Temp Min - {this.converter(temp_min)}&deg;</div>
                        <div className="header__right-max">Temp Max - {this.converter(temp_max)}&deg;</div>
                    </div>
                    <div className="header__right">
                        <div className="header__right-min">Wind Speed - {windSpeed} Km/h</div>
                        <div className="header__right-max">Humidity - {humidity} %</div>
                    </div>
                    <div className="header__last">
                        <div className="header__right-feel">Pressure - {pressure} hPa</div>
                        <div className="header__right-min">Sunrise - {currentRise} AM</div>
                        <div className="header__right-max">Sunset&nbsp; - {currentSet} PM</div>
                    </div>
                </div>
                <div className="greet-time">
                  <div className="greeting">{greet}</div>
                  <div className="timer">
                          <p className="timer__time">{this.state.currTime}</p>
                          <p className="timer__date">{currentDate}</p>
                  </div>
                </div>
              </div>
              <div className="bottom">        
                <div className="bottom__leftContainer">
                    <h1 className="bottom__heading">Weather Point</h1>
                    <form className="bottom__form" onSubmit={this.getSecondWeatherData}>
                      <input className="bottom__form-input" type="text" name="name" placeholder="Search for a city" autoFocus /><br></br>
                      <button className="bottom__form-btn" type="submit">CLICK</button>
                      {this.state.errMsg && <span className="bottom__form-msg">{this.state.errMsg}</span>}
                    </form>
                </div>
                {/* ========================================================= */}
                <div className="weather-second">
                    <div className="weather-second__left">
                        <div className="weather-second__left-location">{newName}</div>
                        {newCelsiusSecond && <h1 className="weather-second__left-temp">{newCelsiusSecond}&deg;</h1>}
                        <div className="weather-second__left-description">{secondDescription}</div>
                    </div>
                    {feelsLike && tempMin && tempMax && <div className="weather-second__mid">
                        <div className="weather-second__right-feel">Feels Like - {feelsLike}&deg;</div>
                        <div className="weather-second__right-min">Temp Min - {tempMin}&deg;</div>
                        <div className="weather-second__right-max">Temp Max - {tempMax}&deg;</div>
                    </div>}
                    <div className="weather-second__right">
                        {speed && <div className="weather-second__right-min">Wind Speed - {speed} Km/h</div>}
                        {newHumidity && <div className="weather-second__right-max">Humidity - {newHumidity} %</div>}
                    </div>
                    {tempMin && <div className="weather-second__last">
                        <div className="weather-second__right-feel">Pressure - {newPressure} hPa</div>
                        <div className="weather-second__right-min">Sunrise - {newCurrentRise} AM</div>
                        <div className="weather-second__right-max">Sunset&nbsp; - {newCurrentSet} PM</div>
                    </div>}
                </div>
                {/* ============ */}
                <div className="weather">
                  <div className="weather__midContainer">
                    <div className="weather__midContainer-left">
                      <h2 className="weather__cityCon">
                          <span className="weather__con">{country}</span>
                          <span className="weather__city">{newName}</span>
                      </h2>
                      {newCelsius && <div className="weather__temp">{newCelsius}<sup>°C</sup></div>}
                    </div>
                      <figure className="weather__rightContainer">
                        <figcaption className="weather__caption">{secondDescription}</figcaption>
                        {image1 && <img className="weather__img" src={image1} alt="Image1"/>}
                      </figure> 
                  </div>
                </div>
                {/* ================= */}
              </div>
        </div>
    </div>
    )
  }
}
export default App;
