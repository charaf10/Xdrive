import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { configureAPI } from "../../../IP"; // Importez avec les accolades

const fetchBlocks = async (setBlocks) => {
  const  identreprise = 58;

  try {
    const api = await configureAPI(identreprise); 
    const response = await api.post('get-all-block.php');
    if (response.data) {
      setBlocks(response.data);
    }
  } catch (error) {
    console.error('Error fetching blocks:', error);
  }
};

export default fetchBlocks;
