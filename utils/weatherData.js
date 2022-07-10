const e = require("express");
const request = require("request") //to request data from the API
const constants = require("../config");  //acquiring the constants object from config

const weatherData = (address, callback)=>{
    //constructing the URL
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("Can't fetch data from Open Weather Map API ", undefined);
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather || !body.main.humidity || !body.wind.speed){
            callback("Unable to find required data, try another location", undefined);
        }
        else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name,
                humidity: body.main.humidity,
                windspeed: body.wind.speed
            })
        }
    })
}

module.exports = weatherData;