const cheerio = require("cheerio");
const dayjs = require("dayjs");
const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

exports.wakefield = functions.runWith({
  memory: '2GB',
  timeoutSeconds: '60'
}).https.onRequest(async (req, res) => {
  try {
    let items = {
      bins: [],
    };

    if (!req.query.uprn) return res.send(422);

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.wakefield.gov.uk/site/Where-I-Live-Results?uprn=${req.query.uprn}`,
      {
        waitUntil: "networkidle2",
      }
    );
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    const $ = cheerio.load(bodyHTML);

    $(
      '#ctl00_PlaceHolderMain_Waste_output > div[class*="ind-waste-wrapper"]'
    ).each((index, element) => {
      const bin = {};

      if (index === 2 || index === 3 || index === 4) {
        // Household Waste & Mixed Recycling
        let noGarden = false;
        $(element)
          .find("div")
          .toArray()
          .map((item, i) => {
            console.log(i, $(item).text());
            if (index !== 4) {
              if (i === 0) bin.binType = $(item).text().trim();
              if (i === 6) {
                bin.collectionDate = dayjs($(item).text().trim(), "D/M/YYYY");
                bin.collectionDay = dayjs(bin.collectionDate).format("dddd");
              }
            } else {
              if (
                i === 1 &&
                $(item)
                  .text()
                  .trim()
                  .includes("no garden waste collection service")
              ) {
                noGarden = true;
              } else {
                if (!!noGarden) {
                  if (i === 0) bin.binType = $(item).text().trim();
                  if (i === 6) {
                    bin.collectionDate = dayjs(
                      $(item).text().trim(),
                      "D/MM/YYYY"
                    );
                    bin.collectionDay = dayjs(bin.collectionDate).format(
                      "dddd"
                    );
                  }
                }
              }
            }
          });
      }

      if (Object.keys(bin).length !== 0) items.bins.push(bin);
    });

    return res.send(items);
  } catch (e) {
    console.log(e);
    return res.status(e.response.status).send({
      errors: [
        {
          status: e.response.status,
          message: e.message,
        },
      ],
    });
  }
});
