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

    window.onscroll = function() { _stickyHead() };

    // Get the header
    var header = document.getElementById("filter");

    // Get the offset position 
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function _stickyHead() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

//draw hotel results
const drawRes = (res) => {
    var results = document.getElementById("content-wrapper")
    results.innerHTML = '<div class="results">' + res.map((res) => { // create DOM for all results
        return (
            '<div class="content-results"><div id="res-header"><h2 id="res-title">' + res.name + '</h2>' +
            '<div id="star"><h6>⭐ ' + res.stars + '</6></div></div><br></br>' +
            res.city + ', ' + res.country + '<br></br>' +
            // '<div id="star">⭐ ' + res.stars + '</div>' +
            '<img id="htl-img" src="' + res.images + '"><br></br>' +
            '$' + res.price + ' /Night' +
            '<br></br>' +
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
// TODO add then catches
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

    if (sort == "price" && (list == "Ascending")) { // logic mach sorting
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
// TODO add then catches
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


    if (btn.innerHTML == "Ascending") { // toggel Asc/desc
        btn.innerHTML = "Descending";
    } else {
        btn.innerHTML = "Ascending";
    }

    return btn.innerHTML

}

const test = () => {
    return 0
}

window.onload = app();