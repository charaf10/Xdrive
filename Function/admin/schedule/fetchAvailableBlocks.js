import axios from 'axios';
import myip from '../../../IP';

const fetchAvailableBlocks = async (setAvailableblocks) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_available_blocks.php`);
    if (response.data) {
      setAvailableblocks(response.data);
    }
  } catch (error) {
    console.error('Error fetching available blocks:', error);
  }
};

export default fetchAvailableBlocks;
