import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

const fetchBlockTemplates = async (setBlockTemplates) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_all_blocktemplate.php`);
    if (response.data) {
      setBlockTemplates(response.data);
    }
  } catch (error) {
    console.error('Error fetching block templates:', error);
  }
};

export default fetchBlockTemplates;


