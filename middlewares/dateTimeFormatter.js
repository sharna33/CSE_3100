export function convertToDateTime(dateString) {
  // Remove the timezone region part '[Asia/Dhaka]'
  let cleanedString = dateString.split("[")[0];

  let date = new Date(cleanedString);
  let formattedDate = date.toISOString().replace("T", " ").split(".")[0];

  console.log("Formatted Date: ", formattedDate);
  return formattedDate;
}
