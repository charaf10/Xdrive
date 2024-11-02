import React, { useState, useEffect, useMemo } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { Table, Button, Typography, Layout, Space, Row, Col, notification } from 'antd';
import fetchBlockTemplate from '../../../Function/admin/block/fetchBlockTemplate';
import fetchBlocks from '../../../Function/admin/block/fetchBlocks';
import navigateToNextWeek from '../../../Function/admin/block/navigateToNextWeek';
import navigateToPreviousWeek from '../../../Function/admin/block/navigateToPreviousWeek';
import getDaysForWeek from '../../../Function/admin/block/getDaysForWeek';
import createOrUpdateBlock from '../../../Function/admin/block/createOrUpdateBlock';
import InputNumberComponent from '../../../Component/Textbox/InputNumberComponent';
import '../../../style/block.css';

const { Title } = Typography;
const { Header, Content } = Layout;

const BlockManagementGrid = () => {
  const [blockTemplates, setBlockTemplates] = useState([]);
  const [existingBlocks, setExistingBlocks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [changes, setChanges] = useState({}); // State to track changes

  useEffect(() => {
    fetchBlocks(setExistingBlocks);
    fetchBlockTemplate(setBlockTemplates);
  }, []);

  const daysForWeek = getDaysForWeek(currentWeek);
  const weekStart = format(startOfWeek(currentWeek), 'MMM dd, yyyy');
  const weekEnd = format(endOfWeek(currentWeek), 'MMM dd, yyyy');

  const handleInputChange = (value, day, templateId, mode, existingBlock) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const changesKey = `${templateId}-${dateKey}`;

    setChanges((prevChanges) => ({
      ...prevChanges,
      [changesKey]: { value, mode, templateId, day, existingBlock },
    }));
  };

  const handleSubmit = async () => {
    const changeEntries = Object.entries(changes);
    for (const [key, change] of changeEntries) {
      const { value, mode, templateId, day, existingBlock } = change;
      if (mode === 'create') {
        await createOrUpdateBlock('create', setExistingBlocks, day, templateId, value);
      } else if (mode === 'update') {
        await createOrUpdateBlock('update', setExistingBlocks, existingBlock.blockId, value);
      }
    }
    setChanges({});
    notification.success({
      message: 'Changes Submitted',
      description: 'All changes have been successfully submitted.',
    });
  };

  const columns = useMemo(() => [
    {
      title: 'Cycle',
      dataIndex: 'Name',
      key: 'Name',
      render: (text) => <strong>{text}</strong>,
    },
    ...daysForWeek.map((day, index) => ({
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
            key={`${record.TemplateId}-${day}`}
            value={existingBlock?.Quantity}
            day={day}
            templateId={record.TemplateId}
            mode={mode}
            existingBlock={existingBlock}
            onChange={(value) => handleInputChange(value, day, record.TemplateId, mode, existingBlock)}
          />
        );
      },
    })),
  ], [daysForWeek, existingBlocks, changes]);

  const dataSource = useMemo(() => blockTemplates.map((template) => ({
    ...template,
    key: template.TemplateId,
  })), [blockTemplates]);

  return (
    <Layout>
      <Header>
        <Title level={3}>Manage Blocks</Title>
      </Header>
      <Content>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Button type="primary" onClick={() => navigateToPreviousWeek(setCurrentWeek)}>Previous Week</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={() => navigateToNextWeek(setCurrentWeek)}>Next Week</Button>
            </Col>
          </Row>
          <Row justify="center">
            <Col className="week-display">
              Week Selected: {weekStart} - {weekEnd}
            </Col>
          </Row>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <Row justify="end" style={{ marginTop: 20 }}>
            <Button type="primary" onClick={handleSubmit} disabled={Object.keys(changes).length === 0}>
              Submit Changes
            </Button>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default BlockManagementGrid;
