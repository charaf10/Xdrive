import axios from 'axios';
import myip from '../../../IP';

const fetchDrivers = async (setDrivers, setFiltredDriver) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_alldrivers.php`);
    if (response.data) {
      setDrivers(response.data);
      setFiltredDriver(response.data);
    }
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export default fetchDrivers;