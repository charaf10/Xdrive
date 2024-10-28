const handleAssignButtonVisibility = (block, setSelectedUnassignedBlock, setSelectedUnassignedBlockQuantity, setSelectedUnassignedBlockDay, setSelectedUnassignedBlockTemplateId, setSelectedUnassignedBlockStatus) => {
  setSelectedUnassignedBlock(block);
  setSelectedUnassignedBlockQuantity(block.Quantity);
  setSelectedUnassignedBlockDay(block.Date);
  setSelectedUnassignedBlockTemplateId(block.TemplateId);
  setSelectedUnassignedBlockStatus(true);
};

export default handleAssignButtonVisibility;
