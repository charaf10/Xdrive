import axios from 'axios';
import myip from '../../../IP';

const fetchSchedules = async (setSchedules) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_schedule.php`);
    if (response.data) {
      setSchedules(response.data);
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
};

export default fetchSchedules;
