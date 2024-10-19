import fetchSchedules from './fetchSchedules';
import fetchBlockTemplates from './fetchBlockTemplates';
import fetchDrivers from './fetchDrivers';
import fetchAvailableBlocks from './fetchAvailableBlocks';
import fetchAvailabily from './fetchAvailabily';

const refreshData = async (setSchedules, setBlockTemplates, setDrivers, setFiltredDriver, setAvailableblocks, setAvailability) => {
  await fetchSchedules(setSchedules);
  await fetchBlockTemplates(setBlockTemplates);
  await fetchDrivers(setDrivers, setFiltredDriver);
  await fetchAvailableBlocks(setAvailableblocks);
  await fetchAvailabily(setAvailability);

  console.log('Data refreshed at ', new Date());
};

export default refreshData;
