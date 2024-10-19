import axios from 'axios';
import myip from '../../../IP';

const fetchBlockTemplate = async (setBlockTemplates) => {
  try {
    const response = await axios.get(`http://${myip}:80/api_schedule/get_all_blocktemplate.php`);
    if (response.data) {
      setBlockTemplates(response.data);
    }
  } catch (error) {
    console.error('Error fetching block templates:', error);
  }
};

export default fetchBlockTemplate;
