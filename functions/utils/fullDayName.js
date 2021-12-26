exports.fullDayName = function(shortenedName) {
  switch (shortenedName) {
    case "Mon":
      return "Monday";
    case "Tue":
    case "Tues":
      return "Tuesday";
    case "Wed":
    case "Weds":
      return "Wednesday";
    case "Thu":
    case "Thur":
    case "Thurs":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
    case "Sun":
      return "Sunday";
    default:
      return "Unknown";
  }
}
