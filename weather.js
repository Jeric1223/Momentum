const API_KEY = "bb67609178bfcae2e1e4de222c7871a7";
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (Response){
      return Response.json();
    }).then(function(json){
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${temperature}℃ , ${place}`;
    })
}

function saverCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude =position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude : latitude,
    longitude: longitude
  };
  saverCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError(){
  console.log('Cant access geo location');
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); //위치 정보 얻는 방법.
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }

}

function init(){
  loadCoords();
}

init();