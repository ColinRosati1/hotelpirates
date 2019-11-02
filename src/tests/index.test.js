const { app, initApp, drawRes, populateDom, sortResults, popHotels, sortAsDes } = require('../scripts/utils.js')
const puppeteer = require('puppeteer')

// test('should output app exists', () => {
//     const x = app();

// });

// test("should output Ascending or Descneding str", () => {
//     const text = sortAsDes()
//     expect(text).toBe("Ascending")
// })

test("should populate hotels from API", () => {
    hotels = popHotels()
    expect(hotels).toBe()
})

//TODO
// Jest & puppeteer
// DOM tests
test("should expect dom results", async() => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    page.goto("http://localhost:52330/frontend-assessment-test/src/index.html")

})