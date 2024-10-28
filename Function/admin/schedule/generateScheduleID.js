import formatDate from './formatDate';
import hashString from './hashString';

const generateScheduleID = (date, blockName, driverName) => {
  const dateString = formatDate(date);
  const combinedInfo = `${dateString}-${blockName}-${driverName}`;
  const hashCode = hashString(combinedInfo);
  return hashCode;
};

export default generateScheduleID;
