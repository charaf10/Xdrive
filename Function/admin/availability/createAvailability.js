import axios from 'axios';
import { format } from 'date-fns';
import myip from '../../../IP';
import generateID from './generateID';
import fetchAvailabilities from './fetchAvailabilities';

const createAvailability = async (driverId, day, repeatStatus, listCycleToPass, setExistingAvailabilities) => {
  const availabilityData = {
    AvailabilityId: generateID(),
    DriverId: driverId,
    Date: format(day, 'yyyy-MM-dd'), // Format the date
    ListCycle: listCycleToPass,
    RepeatStatus: repeatStatus,
  };

  try {
    const response = await axios.post(`http://${myip}:80/api_schedule/add_availability.php`, availabilityData);
    fetchAvailabilities(setExistingAvailabilities);
    console.log('Availability saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving availability:', error);
  }
};

export default createAvailability;
