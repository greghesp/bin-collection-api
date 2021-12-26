const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

exports.stockport = functions.https.onRequest(async (req, res) => {
  try {
    let items = {
      bins: [],
    };

    if (!req.query.uprn) return res.send(422);
    const response = await axios(
      `https://myaccount.stockport.gov.uk/bin-collections/show/${req.query.uprn}`
    );

    const $ = cheerio.load(response.data);

    $('div[class*="service-item"]').each((index, element) => {
      const bin = {};

      bin.binType = $(element).find("div > h3").text();

      $(element)
        .find("div > p")
        .toArray()
        .map((item, index) => {
          let dayDate = $(item).text().trim();
          if (index === 1) {
            dayDate = dayDate.split(",");
            bin.collectionDay = dayDate[0];
            bin.collectionDate = dayjs(dayDate[1].trim(), "D MMMM YYYY");
          }
        });
      items.bins.push(bin);
    });

    return res.send(items);
  } catch (e) {
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
