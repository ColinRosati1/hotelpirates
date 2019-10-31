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
    document.getElementById("sort-btn").addEventListener("click", sortAsDes); // add button event listener
    document.getElementById("search-btn").addEventListener("click", sortResults, false); // search button event
    console.log("hotel app")
}

//draw hotel results
const drawRes = (res) => {
    var results = document.getElementById("content-wrapper")
    results.innerHTML = '<div class="">' + res.map((res) => { // create DOM for all results
        return (
            '<div class="content-results">' + 'Hotel : ' + res.name + '<br></br>' +
            'City : ' + res.city + ', ' + res.country + '<br></br>' +
            'Hotel : ' + res.stars + '<br></br>' +
            '<img src="' + res.images + '"><br></br>' +
            'stars : ' + res.price + '<br></br>' +
            'description : ' + res.description + '<br></br>' +
            '</div>'
        )
    }).join('') + '</div>'
}

// populate results
// only show minimum of three star hotels
const populateDom = (res) => {
    var data = res.filter((res) => { // filter out hotels rated less then 3 stars
        return res.stars >= 3;
    })

    hotels = data; // global hotel var
    drawRes(data)
}

// Array.sort()
// Ascending/descending from button filter
const sortResults = () => {
    var results = document.getElementById("content-wrapper")
    var list = document.getElementById("sort-btn").textContent
    var sort = document.getElementById("select-filter").value;

    var _clean = new Promise(function(resolve, reject) { // clear results promise before populate new
        setTimeout(() => {
            results.innerHTML = ''
            resolve()
        }, 30);
    });

    if (results.innerHTML.length > 2) {
        results.innerHTML = '' // clear
    }

    if (sort == "price" && (list == "Ascending")) {
        hotels.sort(function(a, b) { return a.price - b.price });
        _clean.then(() => drawRes(hotels))

    } else if (sort == "price" && (list == "Descending")) {
        hotels.sort(function(a, b) { return a.price - b.price });
        hotels.reverse()
        _clean.then(() => drawRes(hotels))


    } else if (sort == "rating" && (list == "Ascending")) {
        hotels.sort(function(a, b) { return a.stars - b.stars });
        _clean.then(() => drawRes(hotels))


    } else if (sort == "rating" && (list == "Descending")) {
        hotels.sort(function(a, b) { return a.stars - b.stars });
        hotels.reverse()
        _clean.then(() => drawRes(hotels))
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
const sortAsDes = (e) => {
    // sortResults()
    var btn = document.getElementById("sort-btn");

    if (btn.textContent == "Ascending") { // toggel Asc/desc
        btn.innerHTML = "Descending";
    } else {
        btn.innerHTML = "Ascending";
    }

}

window.onload = app();