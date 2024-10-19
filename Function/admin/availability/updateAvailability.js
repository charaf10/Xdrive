import axios from 'axios';
import { format } from 'date-fns';
import myip from '../../../IP';
import fetchAvailabilities from './fetchAvailabilities';

const updateAvailability = async (driverId, day, newListCycle, setExistingAvailabilities) => {
  const data = {
    DriverId: driverId,
    Date: format(day, 'yyyy-MM-dd'),
    NewListCycle: newListCycle,
    RepeatStatus: 'false',
  };

  try {
    const response = await axios.post(`http://${myip}:80/api_schedule/update_availability.php`, data);
    console.log('Availability updated successfully!', response.data);
    fetchAvailabilities(setExistingAvailabilities);
  } catch (error) {
    console.error('Error updating availability:', error);
  }
};

export default updateAvailability;
