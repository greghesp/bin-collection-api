import axios from "axios";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import qs from "qs";

dayjs.extend(customParseFormat);

export default async function (req, res) {
  try {
    let items = {
      bins: [],
    };

    if (!req.query.uprn) return res.send(422);

    var data = qs.stringify({
      Postcode: "-",
      SelectedUprn: "24011054",
      PreviousPostcode: "-",
      PreviousHouse: "",
    });

    // This works in Postman... Can't figure out why it thinks there's no form data here
    const response = await axios({
      method: "POST",
      url: "https://forms.n-somerset.gov.uk/Waste/CollectionSchedule",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    });

    const $ = cheerio.load(response.data);

    console.log($("body").html());

    $("table > tr").each((index, element) => {
      const bin = {};
      console.log($(element).text());
      // $(element)
      //   .find("div ")
      //   .toArray()
      //   .map((item, index) => {
      //     if (index === 1) bin.binType = $(item).text().trim();
      //     if (index === 2) {
      //       let dayDate = $(item).text().trim();
      //       dayDate = dayDate.split("-");
      //       bin.collectionDay = fullDayName(dayDate[0].trim());
      //       bin.collectionDate = dayjs(dayDate[1].trim(), "Dd MMM YYYY");
      //     }
      //   });
      // if (Object.keys(bin).length !== 0) items.bins.push(bin);
    });

    return res.send(items);
  } catch (e) {
    console.error(e);
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