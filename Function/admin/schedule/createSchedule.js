import generateScheduleID from './generateScheduleID';
import { configureAPI } from '../../../IP';

import fetchSchedules from './fetchSchedules';
import fetchAvailableBlocks from './fetchAvailableBlocks';

const createSchedule = async (day, driver, selectedUnassignedBlock, setSchedules, setAvailableblocks) => {
  const  identreprise = 58;


  const scheduleData = {
    ScheduleId: generateScheduleID(day, selectedUnassignedBlock.Name, driver.DriverId),
    BlockId: selectedUnassignedBlock.blockId,
    Date: day,
    Status: '0',
    DriverId: driver.DriverId,
  };

  try {
    const api = await configureAPI(identreprise);
    const response = await api.post('add_schedule.php', scheduleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await fetchSchedules(setSchedules); // Fetch updated schedules
    await fetchAvailableBlocks(setAvailableblocks); // Fetch updated available blocks
    console.log('Schedule created:', response.data);
    return true;
  } catch (error) {
    console.error('Error creating schedule:', error);
    return false;
  }
};

export default createSchedule;
