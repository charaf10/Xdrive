import axios from 'axios';
import myip from '../../../IP';
import fetchSchedules from './fetchSchedules';
import fetchAvailableBlocks from './fetchAvailableBlocks';

const handleConfirmDelete = async (schedule, setShowDeleteModal, showDeleteModal, setSchedules, setAvailableblocks) => {
  const selectedScheduleData = {
    ScheduleId: schedule.ScheduleId,
    BlockId: schedule.BlockId,
  };

  try {
    const response = await axios.post(`http://${myip}:80/api_schedule/delete_schedule.php`, selectedScheduleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setShowDeleteModal(!showDeleteModal);
    await fetchSchedules(setSchedules); // Fetch updated schedules
    await fetchAvailableBlocks(setAvailableblocks); // Fetch updated available blocks
    console.log('Schedule deleted:', response.data);
  } catch (error) {
    console.error('Error deleting schedule:', error);
  }
};

export default handleConfirmDelete;
