import {
  CheshireEast,
  Stockport,
  EastCambridgeshire,
  NorthSomerset,
} from "../../../helpers";

export default async function handler(req, res) {
  const { council } = req.query;

  switch (council) {
    case "cheshire_east":
      return await CheshireEast(req, res);
    case "stockport":
      return await Stockport(req, res);
    case "east_cambridgeshire":
      return await EastCambridgeshire(req, res);
    case "north_somerset":
      return await NorthSomerset(req, res);
    default:
      res.send(200);
  }
}
