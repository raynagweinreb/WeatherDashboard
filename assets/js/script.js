var cityList = $("#cityList");
var searchBtn = $("#searchBtn");
var userInput = $("#userInput");
var apiKey = "115001272ca58c47d98dac11e1d9c60b";
var todaysDate = moment();
$("#currentDay").text(todaysDate.format("MMMM Do YYYY, h:mm: a"));
var cities=[];

//store userinput 
function storeUserInput(e){
    e.preventDefault()
    

            $("#cityList").append("<li class = 'list-group-item'>" + userInput.val() + "</li>")
            cities.push(userInput.val())
            localStorage.setItem("cities",JSON.stringify(cities));
        //variable for url
    var userUrl = $("#userInput").val().trim().toLowerCase();
    

   
        getCityWeather(userUrl);
}
//get weather information 
function getCityWeather(userUrl){
    $("#cityName").text("");
    $("#temperature").text("");
    $("#humidity").text("");
    $("#windSpeed").text("");
    $("#uvIndex").text("")
    $("#date1").text("")
    $("#date2").text("")
    $("#date3").text("")
    $("#date4").text("")
    $("#date5").text("")
    $("#temperatureForecast1").text("")
    $("#temperatureForecast2").text("")
    $("#temperatureForecast3").text("")
    $("#temperatureForecast4").text("")
    $("#temperatureForecast5").text("")

    $("#humidityForecast1").text("")
    $("#humidityForecast2").text("")
    $("#humidityForecast3").text("")
    $("#humidityForecast4").text("")
    $("#humidityForecast5").text("")


    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + userUrl +"&appid=115001272ca58c47d98dac11e1d9c60b"

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response){
          console.log(response)
$("#results").removeClass("d-none")
  $("#cityName").text(response.name)
    var temp = (1.8) * (response.main.temp - 273) + (32.);
   
    $("#temperature").append( "Temperature: "+ temp.toFixed(2) + " F");
    $("#humidity").append("Humidty: "+response.main.humidity + ( "%"));
              $("#windSpeed").append("Wind Speed: "+response.wind.speed + "MPH");

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey
    $.ajax({
        url: UVQueryURL,
        method: "GET"
      })
      .then(function(uv){
          console.log(uv);
     

    $("#uvIndex").append("UV Index: "+uv.value).addClass("bg-danger");
})

var id = response.id; 
//console.log(id);
var forcast = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=" + apiKey;
$.ajax({
    url: forcast,
    method: "GET"
}).then(function(getforecast) {
    //console.log(getforecast);
        $("#date1").append(todaysDate.add(1,"days").format("M/D/YYYY"));
        $("#date2").append(todaysDate.add(2,"days").format("M/D/YYYY"));
        $("#date3").append(todaysDate.add(3,"days").format("M/D/YYYY"));
        $("#date4").append(todaysDate.add(4,"days").format("M/D/YYYY"));
        $("#date5").append(todaysDate.add(5,"days").format("M/D/YYYY"));
        $("#img1").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              getforecast.list[6].weather[0].icon +
              ".png"
          );
          $("#img2").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              getforecast.list[14].weather[0].icon +
              ".png"
          );
          $("#img3").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              getforecast.list[22].weather[0].icon +
              ".png"
          );
          $("#img4").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              getforecast.list[30].weather[0].icon +
              ".png"
          );
          $("#img5").attr(
            "src",
            "https://openweathermap.org/img/w/" +
              getforecast.list[38].weather[0].icon +
              ".png"
          );
 
          $("#temperatureForecast1").append(("Temperature: ")+((1.8)*(getforecast.list[6].main.temp-273) + (32)).toFixed(2)+ (" F"));
          $("#temperatureForecast2").append(("Temperature: ")+((1.8)*(getforecast.list[14].main.temp-273) + (32)).toFixed(2)+ (" F"));
          $("#temperatureForecast3").append(("Temperature: ")+((1.8)*(+getforecast.list[22].main.temp-273) + (32)).toFixed(2)+ (" F"));
          $("#temperatureForecast4").append(("Temperature: ")+((1.8)*(+getforecast.list[30].main.temp-273) + (32)).toFixed(2)+ (" F"));
          $("#temperatureForecast5").append(("Temperature: ")+((1.8)*(+getforecast.list[38].main.temp-273) + (32)).toFixed(2)+ (" F"));

          $("#humidityForecast1").append("Humidity: "+getforecast.list[6].main.humidity+("%"));
          $("#humidityForecast2").append("Humidity: "+getforecast.list[14].main.humidity+("%"));
          $("#humidityForecast3").append("Humidity: "+getforecast.list[22].main.humidity+("%"));
          $("#humidityForecast4").append("Humidity: "+getforecast.list[30].main.humidity+("%"));
          $("#humidityForecast5").append("Humidity: "+getforecast.list[38].main.humidity+("%"));


});  

});
}
// display city history if user clicks 
function cityHistoryClick(e){
    var li = e.target;
    if(e.target.matches("li")){
        cityHistory= li.textContent.trim();
        getCityWeather(cityHistory);

}
}

function lastcity(){
    var lastcity= JSON.parse(localStorage.getItem("cities"))
    for (var i =0 ; i <localStorage.length; i++)
    lastcityhistory=lastcity[i-1];
    getCityWeather(lastcityhistory)

}
$( window ).on( "load", function() {
    for (var i=0; i<localStorage.length;i++){
    var citiesOnload= JSON.parse(localStorage.getItem("cities"))
     citiesonloadlist= citiesOnload[i];
    console.log(citiesonloadlist);
    var listEl = $("<li>"+citiesonloadlist+"</li>")
    $(listEl).attr("class","list-group-item");
    $("#cityList").append(listEl)
    }
    lastcity()

})

    //$("#cityList").append("<li class = 'list-group-item'>" + JSON.parse((localStorage.getItem("cities")+"</p>")));
    //})


$(searchBtn).on("click",storeUserInput);
$(document).on("click",cityHistoryClick);
