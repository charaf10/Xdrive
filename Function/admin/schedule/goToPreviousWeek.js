import { subWeeks } from 'date-fns';
import getWeeksToDisplay from './getWeeksToDisplay';
const goToPreviousWeek = (setCurrentWeek) => {
  setCurrentWeek((prevWeek) => subWeeks(prevWeek, getWeeksToDisplay()));
};

export default goToPreviousWeek;
