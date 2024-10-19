import axios from 'axios';
import { format } from 'date-fns';
import myip from '../../../IP';
import generateID from './generateID';

const createOrUpdateBlock = async (action, setExistingBlocks, ...params) => {
  try {
    let response;
    if (action === 'create') {
      const [date, templateId, quantity] = params;
      response = await axios.post(`http://${myip}:80/api_schedule/add_block.php`, {
        BlockId: generateID(),
        TemplateId: templateId,
        Date: format(date, 'yyyy-MM-dd'),
        Quantity: quantity,
      });
      console.log('Block created successfully!', response.data);
    } else if (action === 'update') {
      const [blockId, newQuantity] = params;
      const quantityToPass = newQuantity != null ? newQuantity : 0;
      response = await axios.post(`http://${myip}:80/api_schedule/update_block.php`, {
        BlockId: blockId,
        NewQuantity: quantityToPass,
      });
      console.log('Block updated successfully!', response.data);
    }

    // Fetch the updated blocks
    const fetchResponse = await axios.get(`http://${myip}:80/api_schedule/get-all-block.php`);
    if (fetchResponse.data) {
      setExistingBlocks(fetchResponse.data);
    }
  } catch (error) {
    console.error(`Error ${action === 'create' ? 'creating' : 'updating'} block:`, error);
    alert(`Failed to ${action === 'create' ? 'create' : 'update'} block. Please try again later.`);
  }
};

export default createOrUpdateBlock;
