import { addWeeks } from 'date-fns';

const navigateToNextWeek = (setCurrentWeek) => {
  setCurrentWeek((prevWeek) => addWeeks(prevWeek, 1));
};

export default navigateToNextWeek;
