import axios from 'axios';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

const fetchAllDrivers = async (setDrivers, setFiltredDriver) => {
  try {
    const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_alldrivers.php`);
    setDrivers(response.data);
    setFiltredDriver(response.data);
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export default fetchAllDrivers;
