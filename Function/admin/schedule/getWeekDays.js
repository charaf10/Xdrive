import { startOfWeek, endOfWeek, addWeeks, eachDayOfInterval } from 'date-fns';
import getWeeksToDisplay from './getWeeksToDisplay';

const getWeekDays = (currentWeek, viewType) => {
const start = startOfWeek(currentWeek);
const end = endOfWeek(addWeeks(start, getWeeksToDisplay(viewType) - 1));
return eachDayOfInterval({ start, end });
};

export default getWeekDays;