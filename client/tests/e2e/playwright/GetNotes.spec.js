const { chromium, firefox } = require("playwright");
const { expect } = require("chai");

describe("Getting notes test", () => {
  let browser;
  let page;

  async function initialCheck() {
    page = await browser.newPage();

    await page.goto("http://localhost:8080/");

    const items = await page.$("li");
    expect(items).to.be.null;
  }

  async function finalCheck() {
    await page.waitForSelector("#motivation-notes__item");

    const list = await page.$("#motivation-notes__item");
    expect(list).to.exist;

    await browser.close();
    await page.close();
  }

  async function testRandomPage() {
    await initialCheck();

    const goToRandomButton = await page.$("#random_button");
    await goToRandomButton.click();

    const getRandomButton = await page.$("#get_random");
    await getRandomButton.click();

    await finalCheck();
  }

  async function testBySubstringPage() {
    await initialCheck();

    const goToFindBySubstringButton = await page.$("#find_string_button");
    await goToFindBySubstringButton.click();

    const substring = "Президент РФ";
    const input = await page.$("#input_text");
    await input.type(substring);

    const getBySubstringButton = await page.$("#find_note_by_substring");
    await getBySubstringButton.click();

    await finalCheck();
  }

  async function testByIdPage() {
    await initialCheck();

    const goToFindBySubstringButton = await page.$("#find_id_button");
    await goToFindBySubstringButton.click();

    const id = 1;
    const input = await page.$("#input_text");
    await input.type(id.toString());

    const getByIdButton = await page.$("#find_note_by_id");
    await getByIdButton.click();

    await finalCheck();
  }

  it("Go to Random Note page, get random note and go back (chromium)", async () => {
    browser = await chromium.launch();
    await testRandomPage();
  });

  it("Go to Get Note by substring page, get note and go back (chromium)", async () => {
    browser = await chromium.launch();
    await testBySubstringPage();
  });

  it("Go to Get Note by id page, get note and go back (chromium)", async () => {
    browser = await chromium.launch();
    await testByIdPage();
  });

  it("Go to Random Note page, get random note and go back (firefox)", async () => {
    browser = await firefox.launch();
    await testRandomPage();
  });

  it("Go to Get Note by substring page, get note and go back (firefox)", async () => {
    browser = await firefox.launch();
    await testBySubstringPage();
  });

  it("Go to Get Note by id page, get note and go back (firefox)", async () => {
    browser = await firefox.launch();
    await testByIdPage();
  });
});
