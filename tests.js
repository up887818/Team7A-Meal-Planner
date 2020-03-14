// testing file for travis ci to be able to test webpages
'use strict';

const puppeteer = require('puppeteer');
// this is basically like headless chrome??

async function runTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('localhost:8080/');
  //homepage

  await page.goto('localhost:8080/showAll');
  //show all recipes  
}