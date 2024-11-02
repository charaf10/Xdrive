import axios from 'axios';
import { format } from 'date-fns';

import generateID from './generateID';
import { configureAPI  } from '../../../IP';

const createOrUpdateBlock = async (action, setExistingBlocks, ...params) => {


  const  identreprise = 58;

  try {
 
    const api = await configureAPI(identreprise);
    let response;
    if (action === 'create') {
      const [date, templateId, quantity] = params;

      response = await api.post('add_block.php', {

        BlockId: generateID(),
        TemplateId: templateId,
        Date: format(date, 'yyyy-MM-dd'),
        Quantity: quantity,
      });

      console.log('Block created successfully!', response.data);
    } else if (action === 'update') {
      const [blockId, newQuantity] = params;
      const quantityToPass = newQuantity != null ? newQuantity : 0;
      response = await api.post('update_block.php', {
        BlockId: blockId,
        NewQuantity: quantityToPass,
      });
      console.log('Block updated successfully!', response.data);
    }


    const fetchResponse =  await api.get('get-all-block.php'); //await axios.get(`http://${myip}:80/${mydbAPI}/get-all-block.php`);
    if (fetchResponse.data) {
      setExistingBlocks(fetchResponse.data);
    }
  } catch (error) {
    console.error(`Error ${action === 'create' ? 'creating' : 'updating'} block:`, error);
    alert(`Failed to ${action === 'create' ? 'create' : 'update'} block. Please try again later.`);
  }


  /*
  try {
    let response;
    if (action === 'create') {
      const [date, templateId, quantity] = params;
      response = await axios.post(`http://${myip}:80/${mydbAPI}/add_block.php`, {
        BlockId: generateID(),
        TemplateId: templateId,
        Date: format(date, 'yyyy-MM-dd'),
        Quantity: quantity,
      });
      console.log('Block created successfully!', response.data);
    } else if (action === 'update') {
      const [blockId, newQuantity] = params;
      const quantityToPass = newQuantity != null ? newQuantity : 0;
      response = await axios.post(`http://${myip}:80/${mydbAPI}/update_block.php`, {
        BlockId: blockId,
        NewQuantity: quantityToPass,
      });
      console.log('Block updated successfully!', response.data);
    }

    // Fetch the updated blocks
    const fetchResponse = await axios.get(`http://${myip}:80/${mydbAPI}/get-all-block.php`);
    if (fetchResponse.data) {
      setExistingBlocks(fetchResponse.data);
    }
  } catch (error) {
    console.error(`Error ${action === 'create' ? 'creating' : 'updating'} block:`, error);
    alert(`Failed to ${action === 'create' ? 'create' : 'update'} block. Please try again later.`);
  }
    */
};

export default createOrUpdateBlock;
