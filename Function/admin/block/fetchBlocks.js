import { configureAPI } from "../../../IP";



const fetchBlocks = async (setExistingBlocks) => {
  const  identreprise = 58;
  try {
    const api = await configureAPI(identreprise); 
    const response = await api.post('get-all-block.php'); 
    if (response.data) {
      setExistingBlocks(response.data);
    }
  } catch (error) {
    console.error('Error fetching blocks:', error);
  }
};

export default fetchBlocks;
