// getWeeksToDisplay.js
const getWeeksToDisplay = (viewType) => {
  return viewType === 'weekly' ? 1 : 2;
};

export default getWeeksToDisplay;
