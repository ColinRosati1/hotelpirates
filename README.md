# Hotel finder App ☠️

# Overview
=======
![alt text](https://github.com/ColinRosati1/hotelpirates/blob/Colins-branch/Capture.PNG)

## Overview
>>>>>>> refs/remotes/testorigin/Colins-branch

Build a small web app that lists hotels from api call and filters based on stars or price.
Suggest back end flight data structure for.


## Context

* HTML
* CSS
* JavaScript


## 1. Task

We need for our next trip with the whole ☠️-crew a hotel and what we get from our backend-🐵 was only [this](http://fake-hotel-api.herokuapp.com/).

Present us the hotels that we can choose the right one for our next trip. To make it easier for us to find the right hotel, we want to have a filter for hotel ⭐ (stars) and hotel 💰 (price).

To get to our hotel, we also need a flight. 

## Proposed Solution

API call
Async call to API. coherse data into JSON. Catch no data and call API again. return the API results 
and populate the DOM. 

Flight API Solution
For the flight finder backend API I have written a small function to send a get request call 
similar to the provided fake hotels api. In a small modal a user enters flight details. The desitantion
city is bound to the selected hotel. This function returns an object with four keys:
 flights = {
     departure: "city",
     destination: "cityStr",
    departureDate: "xx.xx.xx",
    returnDate: "xx.xx.xx"
}

The url for a heroku backend would respond to :
"http://fake-hotel-api.herokuapp.com/api/flights/departure/desitnation/departureDate/returnDate

The backend would scrap for results returning many results. These results could be filtered and 
handled  in the fronted by price, length, layover sorting.

## Challenges

    sort data API data. I mapped all of the API results to populate the DOM inside the callback as Im
    handling the API async. I am not satisfied with how messy my drawRes() became. There are two promise
    callbacks. I honeslty wish I was writing this in React. Since I am using JS to handle the DOM
    React is much faster, safer to handle bugs etc.

    I am not satisfied with hotels review callback. This became messy passing the hotel id to an ascync
    function and writing DOM elements in a nested callback! 

    I found writing tests simulating the DOM with JEST & puppeteer to be difficult to test for. Often
    I was testing if the DOM element existed rather then the data inside of it. I would restructure my
    functions to seperate DOM handling and data handling to do more unit testing before integrating them.
    
## TODOS
- write Modular CSS and JS components. Import these for clarity of code.
- Clean up Async API promises so there is not nested callbacks populating DOM.
    This is too messy solution. Im not satisfied.
- Toggle review comments hide/display
- write catches for the filter sorting data
- handle flight details into a purchase portal
- handle flight details API response
- find flight modal only works in dev. 
- build importing style and JS resources errors

### Instructions

To start, you must only install the dependencies.

open ./build/index.html 



***** for find flight modal you must run the dev code.

open ./src/index.html 





