import axios from 'axios';
import generateScheduleID from './generateScheduleID';
//import myip from '../../../IP';
//import mydbAPI from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

import fetchSchedules from './fetchSchedules';
import fetchAvailableBlocks from './fetchAvailableBlocks';

const createSchedule = async (day, driver, selectedUnassignedBlock, setSchedules, setAvailableblocks) => {
  const scheduleData = {
    ScheduleId: generateScheduleID(day, selectedUnassignedBlock.Name, driver.DriverId),
    BlockId: selectedUnassignedBlock.blockId,
    Date: day,
    Status: '0',
    DriverId: driver.DriverId,
  };

  try {
    const response = await axios.post(`http://${myip}:80/${mydbAPI}/add_schedule.php`, scheduleData, {
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
