import { configureAPI  } from '../../../IP';


const fetchAvailabily = async (setAvailability) => {
const  identreprise = 58;

  try {

    const api = await configureAPI(identreprise);
    const response = await api.post('get_availability.php');
    if (response.data) {
      setAvailability(response.data);
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
  }

};

export default fetchAvailabily;
