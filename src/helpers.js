export const convertUnixTo24Hour = function (unixTime) {
  const date = new Date(unixTime * 1000); // Convert to milliseconds

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

export const getCurrentTime = function () {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  const formattedHour = currentHour < 10 ? '0' + currentHour : currentHour;
  const formattedMin = currentMin < 10 ? '0' + currentMin : currentMin;

  return `${formattedHour}:${formattedMin}`;
};

export const getUpdateDate = function () {
  const day = new Date().getUTCDate() + 1;
  const month = new Date().getMonth() + 1;
  const formattedDay = day >= 10 ? day : '0' + day;
  const fomrattedMonth = month >= 10 ? month : '0' + month;
  const result = `${formattedDay}/${fomrattedMonth} ${getCurrentTime()}`;

  return result;
};
