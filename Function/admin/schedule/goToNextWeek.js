import { addWeeks } from 'date-fns';
import getWeeksToDisplay from './getWeeksToDisplay';

const goToNextWeek = (setCurrentWeek) => {
  setCurrentWeek((prevWeek) => addWeeks(prevWeek, getWeeksToDisplay()));
};

export default goToNextWeek;
