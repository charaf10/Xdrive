import { subWeeks } from 'date-fns';

const navigateToPreviousWeek = (setCurrentWeek) => {
  setCurrentWeek((prevWeek) => subWeeks(prevWeek, 1));
};

export default navigateToPreviousWeek;
