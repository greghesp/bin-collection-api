exports.fullDayName = function (shortenedName) {
  const lowerCase = shortenedName.toLowerCase();
  switch (lowerCase) {
    case "mon":
      return "Monday";
    case "tue":
    case "tues":
      return "Tuesday";
    case "wed":
    case "weds":
      return "Wednesday";
    case "thu":
    case "thur":
    case "thurs":
      return "Thursday";
    case "fri":
      return "Friday";
    case "sat":
      return "Saturday";
    case "sun":
      return "Sunday";
    default:
      return "Unknown";
  }
};
