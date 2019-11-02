// test
// load API !
// Populate hotel restults DOM !
// Sort button Ascend or Descend !
// select events

const fetchMock = require('fetch-mock');
const { app, initApp, drawRes, populateDom, sortResults, popHotels, sortAsDes } = require('../scripts/utils.js')
const puppeteer = require('puppeteer')

let browser;
const appPath = "http://localhost:52330/frontend-assessment-test/src/index.html"

test("should expect API to return data", () => {
    const res = fetchMock.mock('http://fake-hotel-api.herokuapp.com/api/hotels', 200);
    expect(res).toBeTruthy()
})


test("should expect buttons and select event", () => {
    const res = fetchMock.mock('http://fake-hotel-api.herokuapp.com/api/hotels', 200);
    expect(res).toBeTruthy()
})


//TODO
// Jest & puppeteer
// DOM tests
test("should expect sort button Ascending or Descending textContent", async() => {
    browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(appPath);
    await page.click('button#sort-btn')

    const sortBtnText = await page.$eval('#sort-btn', el => el.textContent)

    expect(sortBtnText).toBe("Ascending" || "Desceingin")
})


test("should expect API to populate results div", async() => {
    browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(appPath);

    const res = await page.waitForSelector(".results");

    expect(res).toBeTruthy()
})


test("should expect sorting filter", async() => {
    browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(appPath);

    const sortAsc = await page.waitForSelector("#sort-btn").textContent;
    const sortFilt = await page.waitForSelector("#select-filter").value;

    expect(sortAsc === "Ascending" || sortAsc === "Descending")
    expect(sortFilt);
})