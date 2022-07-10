const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const weatherData = require("../utils/weatherData");

const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set("view engine", "hbs");  //bcz all the files are going to be rendered in form oh handlebars(hbs);
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res)=>{
    res.render("index", {
        title: "Weather App"
    })
})

// localhost:3000/weather?address=Pune;
app.get('/weather', (req, res)=>{
    const address = req.query.address 

    //if we dont type anything in search box
    if(!address){
        return res.send({
            error: "Please enter the City name"
        })
    }
    weatherData(address, (error, {temperature, description, cityName, humidity, windspeed} = {}) =>{
        if(error){
            return res.send({
                error  
            })
        }
        // console.log(temperature, description, cityName, humidity, windspeed);
        res.send({
            temperature, 
            description, 
            cityName, 
            humidity, 
            windspeed
        })
    })
})

app.get('*', (req, res)=>{
    res.render("404", {
        title: "Page not found"
    })
})

app.listen(port, ()=>{
    console.log("Server is up and running on port: ", port);
})