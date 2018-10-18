import request from '../__mocks__/requests.js'
import "isomorphic-fetch"
import puppeteer from "puppeteer";

const APP = 'http://localhost:8080/index.html'
let page;
let browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
  });
  page = await browser.newPage();
  await page.goto(APP);
});


afterAll(async () => {
    await page.close();
});

describe('Basic Text & Element Inclusion', () => {
  // it('Should display "Taboola" text on page', async () => {
  //
  //   await expect(page).toInclude('Taboola');
  // });

  it('Should assert that <title> is correct', async () => {
    const title = await page.title()
    await expect(title).toMatch('Taboola')
  })

  it('Should display .container element', async () => {
    const container = await page.$eval(
          '.container', el => (el ? true : false)
        )
    expect(container).toBe(true)
  })
  it('Should display .header element', async () => {
    const header = await page.$eval(
          '.header', el => (el ? true : false)
        )
    expect(header).toBe(true)
  })
});

describe('Test Fetch Requests Successfully', () => {
  it('Works with fetches', () => {
    return request()
      .then(res => expect(res.list.length).toEqual(6))
  })

  it('Should include the proper key(s) in API response', () => {
    return request()
      .then(res => expect(
        Object.keys(res.list[0])[0])
          .toEqual('thumbnail'))
  })
})
