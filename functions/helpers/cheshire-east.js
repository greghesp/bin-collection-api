const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs")
const customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(customParseFormat);

exports.cheshireEast = functions.https.onRequest(async (req, res) => {
  try {
    let items = {
      bins: [],
    };

    if (!req.query.uprn) return res.send(422);
    const response = await axios(
      `https://online.cheshireeast.gov.uk/MyCollectionDay/SearchByAjax/GetBartecJobList?uprn=${req.query.uprn}`
    );

    const $ = cheerio.load(response.data);

    $(
      "div.inner-results-contains-table > div > table > tbody > tr.data-row > td.visible-cell"
    ).each((index, element) => {
      const bin = {};

      $(element)
        .find("label")
        .toArray()
        .map((item, index) => {
        console.log($(item).text())

          switch (index) {
            case 0:
              bin.collectionDay = $(item).text();
              break;
            case 1:
              bin.collectionDate = dayjs($(item).text(), "DD/MM/YYYY");
              break;
            case 2:
              bin.binType = $(item).text();
              break;
            default:
              return;
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


