const { log } = require("console");
const express=require("express");
const { write } = require("fs");
 const app=express();
 const https = require("https");
 const bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({extended:true}))
app.listen(880 , function() {
    console.log("server started on port 880");
});
app.get("/" , function(req,res) {
    res.sendFile(__dirname +"/index.html");
});
   app.post("/" , function(req,res) {
    const query= req.body.cityname;
    const apikey= "a1922e7624605d4f03d187321c63be3c";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";
    https.get(url,function(response) {
      console.log(response.statusCode);
      response.on("data" , function(data) {
        
       const weatherData=JSON.parse(data);
       const weatherdescription = weatherData.weather[0].description;
       const temp = weatherData.main.temp;
       const icon = weatherData.weather[0].icon;
       const name = weatherData.name;
       const imageurl = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";
       res.write("<h1>The current temp in " +name+" is " + temp + " degree celsius</h1>");
       res.write("<p>The current weather condition is " + weatherdescription + "</p>");
       res.write("<img src="+ imageurl +">");
       res.send();
      });
    });
});


