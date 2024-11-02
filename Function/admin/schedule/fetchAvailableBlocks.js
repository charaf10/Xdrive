import { configureAPI } from '../../../IP';

const fetchAvailableBlocks = async (setAvailableblocks) => {
  const  identreprise = 58;

try{
  const api = await configureAPI(identreprise); 
  const response = await api.post('get_available_blocks.php');
  console.log("response :  " + response.data[0]);
  
  if (response.data) {
    setAvailableblocks(response.data);
  }
} catch (error) {
  console.error('Error fetching available blocks:', error);
}  
};

export default fetchAvailableBlocks;
