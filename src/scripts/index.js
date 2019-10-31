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

const populateDom = (res) => {
    var results = document.getElementById("content-wrapper")

    var data = res.filter((res) => { // filter out hotels rated less then 3 stars
        return res.stars >= 3;
    })


    hotels = data;
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

    var results = document.getElementById("content-wrapper")
    console.log("select event", e, e.target, e.target.value);
    var sort = e.target.value;

    // Array.sort()
    // Ascending number
    // numbers as string
    // handle number strings properly with  "compare function" (See "Parameter Values" below). https://www.w3schools.com/jsref/jsref_sort.asp

    if (sort == "price") {
        hotels.sort(function(a, b) { return a.price - b.price });
        results.innerHTML = '';

        results.innerHTML = '<div class="">' + hotels.map((hotels) => { // create DOM for all results
            return (
                '<div class="content-results">' + 'Hotel : ' + hotels.name + '<br></br>' +
                'City : ' + hotels.city + ', ' + hotels.country + '<br></br>' +
                'Hotel : ' + hotels.stars + '<br></br>' +
                '<img src="' + hotels.images + '"><br></br>' +
                'stars : ' + hotels.price + '<br></br>' +
                'description : ' + hotels.description + '<br></br>' +
                '</div>'
            )
        }).join('') + '</div>'
    } else if (sort == "rating") {
        hotels.sort(function(a, b) { return a.stars - b.stars });
        results.innerHTML = '';

        results.innerHTML = '<div class="">' + hotels.map((hotels) => { // create DOM for all results
            return (
                '<div class="content-results">' + 'Hotel : ' + hotels.name + '<br></br>' +
                'City : ' + hotels.city + ', ' + hotels.country + '<br></br>' +
                'Hotel : ' + hotels.stars + '<br></br>' +
                '<img src="' + hotels.images + '"><br></br>' +
                'stars : ' + hotels.price + '<br></br>' +
                'description : ' + hotels.description + '<br></br>' +
                '</div>'
            )
        }).join('') + '</div>'
    }
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