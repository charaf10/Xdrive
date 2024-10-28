import { eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

const getDaysForWeek = (currentWeek) => {
  const start = startOfWeek(currentWeek, { weekStartsOn: 0 }); // Start of the current week (Sunday)
  const end = endOfWeek(currentWeek, { weekStartsOn: 0 }); // End of the current week (Saturday)
  return eachDayOfInterval({ start, end });
};

export default getDaysForWeek;
