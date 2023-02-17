let lat;
let lon;

let locationName = document.getElementById("locationName");
let Icon = document.getElementById("Icon");
let desc = document.getElementById("description");
let temp = document.getElementById("temp");
let subTemps = document.getElementById("subTemps");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let windspeed = document.getElementById("windspeed");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);

        let data = await getWeatherData(lat, lon);
        var map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${data.name}</b>`).openPopup();

        map.on('click', async function (e) {
            const data = await getWeatherData(e.latlng.lat, e.latlng.lng);
            marker.setLatLng([e.latlng.lat, e.latlng.lng]);
            marker.bindPopup(`<b>${data.name}</b>`).openPopup();
        });
        return data

    })
};

async function getWeatherData(lat, lon) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4bafb59f098e8fbc66c33327a08a9e26`
    let response = await fetch(api)
    let data = await response.json();
    console.log(data);
    dataHandler(data)
    return data
}
//destructuring
//extracting each and every data and store it in a indivisual variable

function dataHandler(data) {
    const { temp } = data.main;
    const { description } = data.weather[0];
    const { temp_min } = data.main;
    const { temp_max } = data.main;
    const { speed } = data.wind;

    locationName.innerHTML = "PLACE : " + data.name;
    desc.innerHTML = "DESCRIPTION : " + description;
    temperature.innerHTML = "TEMPERATURE : " + temp;
    windspeed.innerHTML = "SPEED : " + speed;
    minTemp.innerHTML = "MIN TEMP : " + temp_min;
    maxTemp.innerHTML = "MAX TEMP : " + temp_max;

}