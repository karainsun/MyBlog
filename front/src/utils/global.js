import jsdom from 'jsdom'

const { JSDOM } = jsdom
const dom = new JSDOM(``, {
  url: "http://localhost",
  referrer: "http://localhost",
  contentType: "text/html",
  // userAgent: "Mellblomenator/9000",
  includeNodeLocations: true
});
const { window } = dom
const { localStorage } = window

export {
  window,
  localStorage
}
