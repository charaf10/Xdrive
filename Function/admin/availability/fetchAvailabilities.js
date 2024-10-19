import axios from 'axios';
import myip from '../../../IP';

const fetchAvailabilities = async (setExistingAvailabilities) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_availability.php`);
    if (response.data) {
      setExistingAvailabilities(response.data);
    }
  } catch (error) {
    console.error('Error fetching availabilities:', error);
  }
};

export default fetchAvailabilities;
