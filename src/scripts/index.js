//index.js
//populate app
//sort results

var hotels = '';
var flights = {
    departure: "city",
    destination: "cityStr",
    departureDate: "xx.xx.xx",
    returnDate: "xx.xx.xx"
}

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
        var review = reviews(res.id)

        return (
            '<div class="content-results"><div id="res-header"><h2 id="res-title">' + res.name + '</h2>' +
            '<div id="star"><h6>⭐ ' + res.stars + '</6></div></div><br></br>' +
            res.city + ', ' + res.country + '<br></br>' +
            '<img id="htl-img" src="' + res.images + '"><br></br>' +
            '$' + res.price + ' /Night' +
            '<br></br>' +
            'description : ' + res.description + '<br></br>' +
            '<div id="reviewSection"></div>' +
            '<button id="select-hotel">Select</button>' +
            '<button id="find-flight" onClick="findFlight(\'' + res.city + '\')">Find Flight</button>' +
            '</div>'
        )
        popRev(res)
    }).join('') + '</div>'

    // document.getElementById("find-flight").addEventListener("click", findFlight, false); // search button event

}

// populate results
// only show minimum of three star hotels
const populateDom = async(res) => {
    if (!res) {}
    var data = await res.filter((res) => { // filter out hotels rated less then 3 stars
        return res.stars >= 3;
    })

    hotels = data; // global hotel var
    console.log(data)
    drawRes(data)
}

// Array.sort()
// Ascending/descending from button filter
// TODO add promise catches
const sortResults = () => {
    var results = document.getElementById("content-wrapper")
    var list = document.getElementById("sort-btn").textContent;
    var sort = document.getElementById("select-filter").value;

    var _clean = new Promise(function(resolve, reject) { // clear results promise before populate new
        setTimeout(() => {
            results.innerHTML = ''
            resolve()
        }, 10);
    });

    if (results.innerHTML.length > 2) {
        results.innerHTML = '' // clear dom
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
    } else {
        document.getElementById("content-wrapper").innerHTML = "filter result error"
    }
}


// fetch hotel results
const popHotels = async() => {
    const url = " http://fake-hotel-api.herokuapp.com/api/hotels";

    // no custom header requests
    const options = {}
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        hotels = data;
        const drawRes = await populateDom(data);
        // const reviews = await reviews(data.id)
        return data;
    } catch (err) {
        console.log(err.response); // if api error try call it again
        popHotels()
    }
}

//sort based on selection props 
//1. stars  2. price
const sortAsDes = (e) => {
    var btn = document.getElementById("sort-btn");

    if (btn.innerHTML == "Ascending") { // toggel Asc/desc string on button
        btn.innerHTML = "Descending";
    } else {
        btn.innerHTML = "Ascending";
    }

    return btn.innerHTML
}

// open modal
// return flight detials object
const selectDetails = async(city) => {
    const details = {
        departure: "city",
        destination: "cityStr",
        departureDate: "xx.xx.xx",
        returnDate: "xx.xx.xx"
    }

    document.getElementById('flight-modal').style.display = 'flex' // trigger modal
    document.getElementById('flight-modal-p').innerHTML = "Select Flight Details to " + city;

    return await details
}

//click modal handle flight details
const handleFlightDetails = () => {
    console.log("handle flight details event")
    var dep = document.getElementById("depM").value;
    var depDate = document.getElementById("depDateM").value;
    var retDate = document.getElementById("retDateM").value;

    flights = {
        departure: dep,
        destination: "cityStr",
        departureDate: depDate,
        returnDate: retDate
    }

    document.getElementById('flight-modal').style.display = 'none';

    return flights
}

const findFlight = async(city) => {
    console.log('find flight', city)
    const cityStr = city.replace(/\s+/g, '-') // clean up spaces from string
    let flightDetails = await selectDetails(city)

    flightDetails.destination = cityStr
    flightApi = flightDetails.departure + '/' + flightDetails.destination + '/' + flightDetails.departureDate + '/' + flightDetails.returnDate
    const url = " http://fake-hotel-api.herokuapp.com/api/flights/" + flightApi;
    console.log('url', url)


    //Find flights need API call to return flights from your departure, destination and dates in JSON
    //flights = {
    // departure: "city",
    // destination: "cityStr",
    // departureDate: "xx.xx.xx",
    // returnDate: "xx.xx.xx"
    // }


}

// populate reviews into DOM
// TODO populate unique reviews. now rewriting one div
const popRev = async(res) => {
    const revSection = document.getElementById("reviewSection")
    revSection.innerHTML = '<div class="results">' + res.map((res) => { // create DOM for all results
        console.log(res.name)
        return (
            '<div class="review-results">' +
            res.name + ', ' + res.comment + '<br></br>' +
            '</div>'
        )
    }).join('') + '</div>'
}

//returns reviews
// construct api call
const reviews = async(id) => {
    const url = "http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=" + id;
    const options = {}
    try {
        const response = await fetch(url, options)
        const data = await response.json()
            // console.log(data)
        const populate = await popRev(data)
        return data;
    } catch (err) {
        console.log(err.response); // if api error try call it again
    }
}


window.onload = app();