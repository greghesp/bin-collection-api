import { CheshireEast, Stockport } from "../../../helpers";

export default async function handler(req, res) {
  const { council } = req.query;

  console.log(req.query);

  switch (council) {
    case "cheshire_east":
      return await CheshireEast(req, res);
    case "stockport":
      return await Stockport(req, res);
      break;
    default:
      res.send(200);
  }
}
