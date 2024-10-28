import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

const fetchAvailableBlocks = async (setAvailableblocks) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_available_blocks.php`);
    if (response.data) {
      setAvailableblocks(response.data);
    }
  } catch (error) {
    console.error('Error fetching available blocks:', error);
  }
};

export default fetchAvailableBlocks;
