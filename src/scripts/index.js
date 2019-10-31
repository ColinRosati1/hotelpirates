//index.js
//populate app
//sort results

var hotels = '';

const app = () => {
    initApp()
    popHotels()
}

// setup events
const initApp = () => {
    document.getElementById("sort-btn").addEventListener("click", sortFilter, false); // add button event listener
    document.getElementById("select-filter").addEventListener("change", sortResults); //add sort select event listener
    console.log("hotel app")
}

// populate results
// only show minimum of three star hotels

const populateDom = (hotels) => {
    var results = document.getElementById("content-wrapper")

    var data = hotels.filter((hotels) => { // filter out hotels rated less then 3 stars
        return hotels.stars >= 3;
    })

    results.innerHTML = '<div class="">' + data.map((data) => { // create DOM for all results
        return (
            '<div class="content-results">' + 'Hotel : ' + data.name + '<br></br>' +
            'City : ' + data.city + ', ' + data.country + '<br></br>' +
            'Hotel : ' + data.stars + '<br></br>' +
            '<img src="' + data.images + '"><br></br>' +
            'stars : ' + data.price + '<br></br>' +
            'description : ' + data.description + '<br></br>' +
            '</div>'
        )
    }).join('') + '</div>'

}

const sortResults = (e) => {
    console.log("select event", e, e.target, e.target.value);
}

// fetch hotel results
const popHotels = () => {
    const url = " http://fake-hotel-api.herokuapp.com/api/hotels";

    // no custom header requests
    const options = {}

    fetch(url, options) // fetch API data
        .then(res => res.json()) // json cohersion
        .then(data => {
            hotels = data; // assign data to global hotel var
            return data;
        }).then(data => populateDom(data)) // pass data into populate function
}


//sort based on selection props 
//1. stars  2. price
const sortFilter = () => {
    console.log("hotel app")
}

window.onload = app();