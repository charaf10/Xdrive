import axios from 'axios';
import myip from '../../../IP';

const fetchBlocks = async (setBlocks) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get-all-block.php`);
    if (response.data) {
      setBlocks(response.data);
    }
  } catch (error) {
    console.error('Error fetching blocks:', error);
  }
};

export default fetchBlocks;
