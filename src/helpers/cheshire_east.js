import axios from "axios";
import * as cheerio from "cheerio";

export default async function (req, res) {
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
          switch (index) {
            case 0:
              bin.collectionDay = $(item).text();
              break;
            case 1:
              bin.collectionDate = $(item).text();
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
}
