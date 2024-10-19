import axios from 'axios';
import myip from '../../../IP';

const fetchAllDrivers = async (setDrivers, setFiltredDriver) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_alldrivers.php`);
    setDrivers(response.data);
    setFiltredDriver(response.data);
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export default fetchAllDrivers;
