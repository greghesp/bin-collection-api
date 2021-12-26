const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs");
const qs = require("qs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const fs = require("fs");
const path = require("path");
const { fullDayName } = require("../utils/fullDayName");
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

    $(`div[class*="collection-calendar-content"]`).each((index, element) => {
      $(element)
        .find(`div[class*="cal-cell-active"] > div > div[class*="cal-inner"]`)
        .toArray()
        .map((item, index) => {
          const bin = {};
          const date = $(item)
            .find(`span[class*="day-no"]`)
            .attr("data-cal-date");
          const day = $(item).find(`span[class*="day-name"]`).text();
          const binType = $(item)
            .find(`div[class*="rc-event-container"] > span`)
            .text();

          bin.collectionDay = fullDayName(day);
          bin.collectionDate = dayjs(date);
          bin.binType = binType;
          items.bins.push(bin);
        });
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
