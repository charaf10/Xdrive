import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades


const fetchAvailabily = async (setAvailability) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_availability.php`);
    if (response.data) {
      setAvailability(response.data);
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
  }
};

export default fetchAvailabily;
