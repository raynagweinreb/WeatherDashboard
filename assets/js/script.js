var cityList = $("#cityList");
var searchBtn = $("#searchBtn");
var userInput = $("#userInput");
var apiKey = "115001272ca58c47d98dac11e1d9c60b";
var todaysDate = moment();
$("#currentDay").text(todaysDate.format("MMMM Do YYYY, h:mm: a"));


//store userinput 
function storeUserInput(e){
    e.preventDefault()
            $("#cityList").append("<li class = 'list-group-item'>" + userInput.val() + "</li>")
            localStorage.setItem("cities"+userInput.val(), userInput.val());
        //variable for url
    var userUrl = $("#userInput").val().trim().toLowerCase();
    

   
        getCityWeather(userUrl);
}
//get weather information 
function getCityWeather(userUrl){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + userUrl +"&appid=115001272ca58c47d98dac11e1d9c60b"

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response){
          //console.log(response)
      $("#results").removeClass("d-none")
  $("#cityName").text(response.name)
    var temp = (1.8) * (response.main.temp - 273) + (32.);
   
    $("#temperature").append( temp + " F");
    $("#humidity").append(response.main.humidity + ( "%"));
              $("#windSpeed").append(response.wind.speed + "MPH");

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey
    $.ajax({
        url: UVQueryURL,
        method: "GET"
      })
      .then(function(uv){
          console.log(uv);
     

    $("#uvIndex").append(uv.value).addClass("bg-danger");
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
 
          $("#temperatureForecast1").append((1.8)*(getforecast.list[6].main.temp-273) + (32)+ (" F"));
          $("#temperatureForecast2").append((1.8)*(getforecast.list[14].main.temp-273) + (32)+ (" F"));
          $("#temperatureForecast3").append((1.8)*(getforecast.list[22].main.temp-273) + (32)+ (" F"));
          $("#temperatureForecast4").append((1.8)*(getforecast.list[30].main.temp-273) + (32)+ (" F"));
          $("#temperatureForecast5").append((1.8)*(getforecast.list[38].main.temp-273) + (32)+ (" F"));

          $("#humidityForecast1").append(getforecast.list[6].main.humidity+("%"));
          $("#humidityForecast2").append(getforecast.list[14].main.humidity+("%"));
          $("#humidityForecast3").append(getforecast.list[22].main.humidity+("%"));
          $("#humidityForecast4").append(getforecast.list[30].main.humidity+("%"));
          $("#humidityForecast5").append(getforecast.list[38].main.humidity+("%"));


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
$( window ).on( "load", function() {
    for (var i =0; i<localStorage.length ;i++)
    $("#cityList").append("<li class = 'list-group-item'>" + localStorage.getItem(localStorage.key(i))+"</p>");
    })


$(searchBtn).on("click",storeUserInput);
$(document).on("click",cityHistoryClick);
