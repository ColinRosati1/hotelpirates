// test
// load API
// API data to JSON
// Populate hotel restults DOM !
// Sort button Ascend or Descend !
// search
// select events


const { app, initApp, drawRes, populateDom, sortResults, popHotels, sortAsDes } = require('../scripts/utils.js')
const puppeteer = require('puppeteer')

let browser;
const appPath = "http://localhost:52330/frontend-assessment-test/src/index.html"

test("should populate hotels from API", () => {
    // hotels = popHotels()
    // expect(hotels).toBe()
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

//TODO complete
// test("should expect search Draw results", async() => {
//     browser = await puppeteer.launch({
//         headless: true
//     });

//     const page = await browser.newPage();
//     await page.goto(appPath);
//     await page.click('button#search-btn')

//     const res = await page.$eval('#content-wrapper', el => el.childNodes)

//     expect(res).toBe()
// })


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
        headless: false
    });

    const page = await browser.newPage();
    await page.goto(appPath);

    const sortAsc = await page.waitForSelector("#sort-btn").textContent;
    const sortFilt = await page.waitForSelector("#select-filter").value;

    // expect(["Ascending", "Desceingin"]).toContain(sortAsc)
    expect(
            sortAsc == "Ascending" ||
            sortAsc == "Desceing"
        ).toBe(true)
        // expect(sortAsc).toBe("Ascending" || "Desceingin")
    expect(sortFilt).toBe("Price" || "rating")
})