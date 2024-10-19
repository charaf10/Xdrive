import createSchedule from './createSchedule';

const handleAssign = async (driver, day, selectedUnassignedBlock, setSelectedUnassignedBlockQuantity, selectedUnassignedBlockQuantity, setSchedules, setAvailableblocks) => {
  const success = await createSchedule(day, driver, selectedUnassignedBlock, setSchedules, setAvailableblocks);
  if (success) {
    setSelectedUnassignedBlockQuantity(selectedUnassignedBlockQuantity - 1);
  } else {
    console.error('Failed to create schedule');
  }
};

export default handleAssign;
