import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { format, addWeeks, subWeeks, startOfWeek, eachDayOfInterval } from 'date-fns';
import { Table } from 'antd';
import myip from '../../../../IP';
import InputNumberComponent from '../../../../Component/Textbox/InputNumberComponent';
import NavigationButtons from '../../../../Component/Button/NavigationButtons';

export const AvailabilityManagementGrid = () => {
  const [blockTemplates, setBlockTemplates] = useState([]);
  const [mode, setMode] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [existingBlocks, setExistingBlocks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const weeksToShow = 5;
  const [repeatAvailability, setRepeatAvailability] = useState(true);

  function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  const handleInputNumberChange = useCallback((value, date, templateId, mode, selectedBlock = null) => {
    setSelectedDate(date);
    setSelectedTemplateId(templateId);

    if (mode === 'create') {
      createOrUpdateBlock('create', date, templateId, value);
    } else if (mode === 'update' && selectedBlock) {
      createOrUpdateBlock('update', selectedBlock.blockId, value);
    } else {
      console.error('Invalid mode or missing block information');
    }
  }, []);

  const createOrUpdateBlock = useCallback(async (action, ...params) => {
    try {
      let response;
      if (action === 'create') {
        const [date, templateId, quantity] = params;
        response = await axios.post(`http://${myip}:80/api_schedule/add_block.php`, {
          BlockId: generateID(),
          TemplateId: templateId,
          Date: format(date, 'yyyy-MM-dd'),
          Quantity: quantity,
        });
        console.log('Block created successfully!', response.data);
      } else if (action === 'update') {
        const [blockId, newQuantity] = params;
        const quantityToPass = newQuantity != null ? newQuantity : 0;
        response = await axios.post(`http://${myip}:80/api_schedule/update_block.php`, {
          BlockId: blockId,
          NewQuantity: quantityToPass,
        });
        console.log('Block updated successfully!', response.data);
      }

      fetchBlocks();
    } catch (error) {
      console.error(`Error ${action === 'create' ? 'creating' : 'updating'} block:`, error);
      alert(`Failed to ${action === 'create' ? 'create' : 'update'} block. Please try again later.`);
    }
  }, [fetchBlocks]);

  const fetchBlockTemplate = useCallback(async () => {
    try {
      const response = await axios.get(`http://${myip}:80/api_schedule/get_all_blocktemplate.php`);
      if (response.data) {
        setBlockTemplates(response.data);
      }
    } catch (error) {
      console.error('Error fetching block templates:', error);
    }
  }, []);

  const fetchBlocks = useCallback(async () => {
    try {
      const response = await axios.get(`http://${myip}:80/api_schedule/get-all-block.php`);
      if (response.data) {
        setExistingBlocks(response.data);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  }, []);

  useEffect(() => {
    fetchBlocks();
    fetchBlockTemplate();
  }, [fetchBlocks, fetchBlockTemplate]);

  const navigateToNextWeek = useCallback(() => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, 1));
  }, []);

  const navigateToPreviousWeek = useCallback(() => {
    setCurrentWeek((prevWeek) => subWeeks(prevWeek, 1));
  }, []);

  const getDaysForWeek = useMemo(() => {
    const start = currentWeek;
    const end = addWeeks(currentWeek, weeksToShow - 1);
    return eachDayOfInterval({ start, end });
  }, [currentWeek, weeksToShow]);

  const columns = useMemo(() => [
    {
      title: 'Cycle',
      dataIndex: 'Name',
      key: 'Name',
    },
    ...getDaysForWeek.map((day, index) => ({
      title: format(day, 'EEE MM/dd'),
      dataIndex: `day-${index}`,
      key: `day-${index}`,
      render: (text, record) => {
        const existingBlock = existingBlocks.find(
          (block) => block.Date === format(day, 'yyyy-MM-dd') && block.TemplateId === record.TemplateId
        );
        const mode = existingBlock ? 'update' : 'create';
        return (
          <InputNumberComponent
            key={`${record.TemplateId}-${day}`} // Unique key for each InputNumberComponent
            value={existingBlock?.Quantity}
            day={day}
            templateId={record.TemplateId}
            mode={mode}
            existingBlock={existingBlock}
            onChange={handleInputNumberChange}
          />
        );
      },
    })),
  ], [getDaysForWeek, existingBlocks, handleInputNumberChange]);

  const dataSource = useMemo(() => blockTemplates.map((template) => ({
    ...template,
    key: template.TemplateId, // Unique key for each row
  })), [blockTemplates]);

  return (
    <div>
      <h1>Manage Blocks</h1>
      <NavigationButtons onPrevious={navigateToPreviousWeek} onNext={navigateToNextWeek} />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AvailabilityManagementGrid;
