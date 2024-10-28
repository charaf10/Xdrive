import { format } from 'date-fns';

const getExistingAvailabilitiesForDriverAndDay = (existingAvailabilities, driverId, day) => {
  const existingAvailabilitiesForDriverAndDay = existingAvailabilities.find(
    (availability) => availability.DriverId === driverId && availability.Date === format(day, 'yyyy-MM-dd')
  );
  return existingAvailabilitiesForDriverAndDay ? JSON.parse(existingAvailabilitiesForDriverAndDay.ListCycle) : [];
};

export default getExistingAvailabilitiesForDriverAndDay;
