import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

const fetchSchedules = async (setSchedules) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_schedule.php`);
    if (response.data) {
      setSchedules(response.data);
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
};

export default fetchSchedules;
