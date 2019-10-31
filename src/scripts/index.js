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
    document.getElementById("sort-btn").addEventListener("click", sortFilter, false);

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

// fetch hotel results
const popHotels = () => {
    const url = " http://fake-hotel-api.herokuapp.com/api/hotels";

    // no custom header requests
    const options = {}

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            hotels = data;
            console.log(hotels)
            return data;
        }).then(data => populateDom(data))


}


//sort based on selection props 
//1. stars  2. price
const sortFilter = () => {
    console.log("hotel app")
}

window.onload = app();