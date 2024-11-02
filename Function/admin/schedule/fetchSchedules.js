import { configureAPI  } from '../../../IP';
const fetchSchedules = async (setSchedules) => {
  const  identreprise = 58;

  try {

    const api = await configureAPI(identreprise); 
    const response = await api.post('get_schedule.php');
    if (response.data) {
      setSchedules(response.data);
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
};

export default fetchSchedules;
