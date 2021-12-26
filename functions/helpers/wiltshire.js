const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs");
const qs = require("qs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const fs = require("fs");
const path = require("path");
dayjs.extend(customParseFormat);

exports.wiltshire = functions.https.onRequest(async (req, res) => {
  try {
    let items = {
      bins: [],
    };

    if (!req.query.uprn || !req.query.postcode) return res.send(422);
    const response = await axios({
      method: "POST",
      url: "https://ilforms.wiltshire.gov.uk/WasteCollectionDays/CollectionList",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        Postcode: req.query.postcode,
        Uprn: req.query.uprn,
      }),
    });
    const $ = cheerio.load(response.data);

    // fs.writeFileSync(
    //   path.join(process.cwd(), "/pageOutputs/wiltshire.html"),
    //   $.html(),
    //   {
    //     encoding: "utf-8",
    //   }
    // );

    $(
      `div[class*="collection-calendar-content"] > div[class*="cal-cell-active"]`
    ).each((index, element) => {
      $(element)
        .find(`div[class*="cal-inner"]`)
        .toArray()
        .map((item, index) => {
          console.log(index, $(item).html());
        });
    });

    // $(
    //   "div.inner-results-contains-table > div > table > tbody > tr.data-row > td.visible-cell"
    // ).each((index, element) => {
    //   const bin = {};
    //
    //   $(element)
    //     .find("label")
    //     .toArray()
    //     .map((item, index) => {
    //     console.log($(item).text())
    //
    //       switch (index) {
    //         case 0:
    //           bin.collectionDay = $(item).text();
    //           break;
    //         case 1:
    //           bin.collectionDate = dayjs($(item).text(), "DD/MM/YYYY");
    //           break;
    //         case 2:
    //           bin.binType = $(item).text();
    //           break;
    //         default:
    //           return;
    //       }
    //     });
    //   items.bins.push(bin);
    // });

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
