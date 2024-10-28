import { format, parseISO } from 'date-fns';

const shouldShowAssignButton = (day, selectedUnassignedBlock) => {
  if (selectedUnassignedBlock.blockId) {
    const blockDate = format(parseISO(selectedUnassignedBlock.Date), 'yyyy-MM-dd');
    return format(day, 'yyyy-MM-dd') === blockDate;
  }
  return false;
};

export default shouldShowAssignButton;
