import axios from "axios";
import * as cheerio from "cheerio";
import cheerioTableparser from "cheerio-tableparser";

export default async function (req, res) {
  try {
    let items = [];

    if (!req.query.uprn) return res.send(422);
    const response = await axios(
      `https://online.cheshireeast.gov.uk/MyCollectionDay/SearchByAjax/GetBartecJobList?uprn=${req.query.uprn}`
    );

    const $ = cheerio.load(response.data);

    $(
      "div.inner-results-contains-table > div > table > tbody > tr.data-row > tr.visible-cell"
    ).each((index, element) => {
      // const cells = $(element).find("td.visible-cell").html();
      console.log(element);
      //const labels = cells[0].find("label");
      //nsole.log(cells);
      //console.log($(element).find("td.visible-cell").html());
      //console.log($(element).text().trim());
    });
    console.log(items);
    return res.send(200);
  } catch (e) {
    console.error(e);
    return true;
  }
}
