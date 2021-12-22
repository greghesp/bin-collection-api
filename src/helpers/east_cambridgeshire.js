import axios from "axios";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default async function (req, res) {
  try {
    let items = {
      bins: [],
    };

    if (!req.query.uprn) return res.send(422);
    const response = await axios(
      `https://eastcambs-self.achieveservice.com/appshost/firmstep/self/apps/custompage/bincollections?language=en&uprn=${req.query.uprn}`
    );

    const $ = cheerio.load(response.data);

    $('div[class*="row collectionsrow"]').each((index, element) => {
      const bin = {};
      $(element)
        .find("div ")
        .toArray()
        .map((item, index) => {
          if (index === 1) bin.binType = $(item).text().trim();
          if (index === 2) {
            let dayDate = $(item).text().trim();
            dayDate = dayDate.split("-");
            bin.collectionDay = dayDate[0].trim();
            bin.collectionDate = dayjs(dayDate[1].trim(), "Dd MMM YYYY");
          }
        });
      if (Object.keys(bin).length !== 0) items.bins.push(bin);
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
