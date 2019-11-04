//index.js
//populate app
//sort results

import '../styles/index.css';

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

    var header = document.getElementById("filter"); // Get the header
    var sticky = header.offsetTop; // Get the offset position 

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function _stickyHead() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

// TODO toggle comment display
// target unique reviews id parent and toggle hide class
const toggleCommentDisplay = (e) => {
    // var elId = "rev" + id;
    // var el = e.parentNode.childNodes

    // console.log(e.parentNode.childNodes.length)

    // for (var i = 3; i > el.length; i++) {
    //     el[i].classList.toggle("hideRev");
    // }

    // el.classList.toggle("hideRev");
    // return
}

//draw hotel results & hotel reviews
// wrap unique reviews element in parent class
// seperate reviews element into comment button always visible and reviews content body to toggle
// clean up this messy DOM element function!!!
const drawRes = async(res) => {
    var results = document.getElementById("content-wrapper")

    results.innerHTML = '<div class="results">' + res.map((res) => { // create DOM for all results
        return (
            '<div class="content-results"><div id="res-header"><h2 id="res-title">' + res.name + '</h2>' +
            '<div id="star"><h6>⭐ ' + res.stars + '</6></div></div><br></br>' +
            res.city + ', ' + res.country + '<br></br>' +
            '<img id="htl-img" src="' + res.images + '"><br></br>' +
            '$' + res.price + ' /Night' +
            '<br></br>' +
            'description : ' + res.description +
            '<div class="reviews" id="' + res.id + '" >' + reviews(res.id).then(val => { // This is the nested reviews callback. TODO fix this ugly nested callback
                document.getElementById(res.id).innerHTML = '<button >Comments</button><br></br>';
                val.map((val) => {
                    return document.getElementById(res.id).innerHTML += "<div id='rev rev-res" + res.id + "'><p>" + val.name + "</p><p>" + val.comment + "</p></div>";
                })
            }) +
            '</div>' +
            '<button id="select-hotel">Select</button>' +
            '<button id="find-flight" onClick="findFlight(\'' + res.city + '\')">Find Flight</button>' +
            '</div>'
        )
    }).join('') + '</div>'
}

// populate results
// only show minimum of three star hotels
const populateDom = async(res) => {
    if (!res) {}
    var data = await res.filter((res) => { // filter out hotels rated less then 3 stars
        return res.stars >= 3;
    })

    hotels = data; // global hotel var
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

//returns reviews
// construct api call
const reviews = async(id) => {
    const url = "http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=" + id;
    const options = {}
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(err.response); // if api error try call it again
    }
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


// find flights back API proposed solution
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

window.onload = app();