import axios from 'axios';
import myip from '../../../IP';

const fetchAvailabily = async (setAvailability) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_availability.php`);
    if (response.data) {
      setAvailability(response.data);
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
  }
};

export default fetchAvailabily;
