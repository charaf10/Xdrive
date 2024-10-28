import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

const fetchAvailabilities = async (setExistingAvailabilities) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_availability.php`);
    if (response.data) {
      setExistingAvailabilities(response.data);
    }
  } catch (error) {
    console.error('Error fetching availabilities:', error);
  }
};

export default fetchAvailabilities;
