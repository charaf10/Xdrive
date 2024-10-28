import { format } from 'date-fns';

const getExistingAvailabilityStatus = (existingAvailabilities, driverId, day) => {
  const existingAvailability = existingAvailabilities.find(
    (availability) => availability.DriverId === driverId && availability.Date === format(day, 'yyyy-MM-dd')
  );
  return existingAvailability ? JSON.parse(existingAvailability.RepeatStatus) : false;
};

export default getExistingAvailabilityStatus;
