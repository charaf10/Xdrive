import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

const fetchBlocks = async (setBlocks) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get-all-block.php`);
    if (response.data) {
      setBlocks(response.data);
    }
  } catch (error) {
    console.error('Error fetching blocks:', error);
  }
};

export default fetchBlocks;
