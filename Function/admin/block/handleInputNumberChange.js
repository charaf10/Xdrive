import createOrUpdateBlock from './createOrUpdateBlock';

const handleInputNumberChange = (value, date, templateId, mode, selectedBlock = null, setSelectedDate, setSelectedTemplateId, setExistingBlocks) => {
  setSelectedDate(date);
  setSelectedTemplateId(templateId);

  if (mode === 'create') {
    createOrUpdateBlock('create', setExistingBlocks, date, templateId, value);
  } else if (mode === 'update' && selectedBlock) {
    createOrUpdateBlock('update', setExistingBlocks, selectedBlock.blockId, value);
  } else {
    console.error('Invalid mode or missing block information');
  }
};

export default handleInputNumberChange;
