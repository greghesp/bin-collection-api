export default async function () {
  // running locally
  const puppeteer = require("puppeteer");
  return puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
  });
}
