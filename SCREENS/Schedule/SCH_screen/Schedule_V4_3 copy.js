import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  parseISO,
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  startOfDay,
  endOfDay,
  addDays,
  subDays,
} from 'date-fns';
import myip from '../../../IP';
import Delete_Schedule_Modal from "../../../Component/Modal/Delete_Schedule_Modal";
import SearchBar from "../../../Component/SearchBar/searchBar";
import Icon from 'react-native-vector-icons/FontAwesome';

// Import functions
import toggleDeleteModal from '../../../Function/admin/schedule/toggleDeleteModal';
import handeSearch from '../../../Function/admin/schedule/handeSearch';
import handleCheckUnassignedBlock from '../../../Function/admin/schedule/handleCheckUnassignedBlock';
import handleBlockClick from '../../../Function/admin/schedule/handleBlockClick';
import switchToViewType from '../../../Function/admin/schedule/switchToViewType';
import handleConfirmDelete from '../../../Function/admin/schedule/handleConfirmDelete';
import shouldShowAssignButton from '../../../Function/admin/schedule/shouldShowAssignButton';
import createSchedule from '../../../Function/admin/schedule/createSchedule';
import handleAssignButtonVisibility from '../../../Function/admin/schedule/handleAssignButtonVisibility';
import handleAssign from '../../../Function/admin/schedule/handleAssign';
import getWeeksToDisplay from '../../../Function/admin/schedule/getWeeksToDisplay';
import getWeekDays from '../../../Function/admin/schedule/getWeekDays';
import goToNextWeek from '../../../Function/admin/schedule/goToNextWeek';
import goToPreviousWeek from '../../../Function/admin/schedule/goToPreviousWeek';
import generateID from '../../../Function/admin/schedule/generateID';
import fetchDrivers from '../../../Function/admin/schedule/fetchDrivers';
import generateScheduleID from '../../../Function/admin/schedule/generateScheduleID';
import formatDate from '../../../Function/admin/schedule/formatDate';
import hashString from '../../../Function/admin/schedule/hashString';
import fetchSchedules from '../../../Function/admin/schedule/fetchSchedules';
import fetchBlocks from '../../../Function/admin/schedule/fetchBlocks';
import fetchAvailableBlocks from '../../../Function/admin/schedule/fetchAvailableBlocks';
import fetchBlockTemplates from '../../../Function/admin/schedule/fetchBlockTemplates';
import fetchAvailabily from '../../../Function/admin/schedule/fetchAvailabily';
import refreshData from '../../../Function/admin/schedule/refreshData';
import blockassignementHandler from '../../../Function/admin/schedule/blockassignementHandler';

const ScheduleV4_3 = () => {
  const [filtredDriver, setFiltredDriver] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [Availableblocks, setAvailableblocks] = useState([]);
  const [blockTemplates, setBlockTemplates] = useState([]);
  const [viewType, setViewType] = useState('weekly');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedUnassignedBlock, setSelectedUnassignedBlock] = useState(null);
  const [selectedUnassignedBlockDay, setSelectedUnassignedBlockDay] = useState(null);
  const [selectedUnassignedBlockQuantity, setSelectedUnassignedBlockQuantity] = useState(0);
  const [selectedUnassignedBlockStatus, setSelectedUnassignedBlockStatus] = useState(false);
  const [selectedUnassignedBlockTemplateId, setSelectedUnassignedBlockTemplateId] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const BLOCK_WIDTH = 100;
  const MODAL_HEIGHT = 150;

  useEffect(() => {
    const loadData = async () => {
      await fetchDrivers(setDrivers, setFiltredDriver);
      await fetchSchedules(setSchedules);
      await fetchBlocks(setBlocks);
      await fetchBlockTemplates(setBlockTemplates);
      await fetchAvailableBlocks(setAvailableblocks);
      await fetchAvailabily(setAvailability);
    };

    loadData();
  }, []);

  const renderHeader = () => {
    const viewTypes = ['daily', 'weekly', 'bi-weekly'];
    const firstDayOfWeek = startOfWeek(currentWeek);
    const lastDayOfWeek = endOfWeek(currentWeek);

    return (
      <View style={styles.header}>
        <View style={styles.viewTypeContainer}>
          {viewTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => switchToViewType(type.toLowerCase(), setViewType)}
              style={[
                styles.viewButton,
                viewType === type.toLowerCase() && styles.activeButton,
              ]}
            >
              <Text style={styles.viewButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navigationButton} onPress={() => goToPreviousWeek(setCurrentWeek, getWeeksToDisplay(viewType))}>
            <Text style={styles.navigationButtonText}>Previous {viewType}</Text>
          </TouchableOpacity>

          <View style={styles.currentWeekContainer}>
            <Text style={styles.currentWeekText}>Current Week: </Text>
            <Text style={styles.currentWeekDateText}>{format(firstDayOfWeek, 'MMM d')} - {format(lastDayOfWeek, 'MMM d')}</Text>
          </View>

          <TouchableOpacity style={styles.navigationButton} onPress={() => goToNextWeek(setCurrentWeek, getWeeksToDisplay(viewType))}>
            <Text style={styles.navigationButtonText}>Next {viewType}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderScheduleGrid = () => {
    let daysToRender = getWeekDays(currentWeek, viewType);
    if (viewType === 'daily') {
      daysToRender = [currentWeek];
    }
    const cellWidth = (Dimensions.get('window').width / daysToRender.length) * 0.72;

    return (
      <View>
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <View style={[styles.cell, { width: cellWidth * 1.1 }]}>
              <SearchBar onUpdate={(searchText) => handeSearch(searchText, drivers, setFiltredDriver, fetchDrivers)} />
            </View>
            {daysToRender.map((day, index) => (
              <View key={index} style={[styles.cell, { width: cellWidth }]}>
                <Text style={styles.dayText}>{format(day, 'EEE')}</Text>
                <Text style={styles.dateText}>{format(day, 'MM/dd')}</Text>
              </View>
            ))}
          </View>

          <View style={styles.row}>
            <View style={[styles.cell, { width: cellWidth * 1.1 }]}>
              <Text style={styles.blocksHeader}>Blocks</Text>
            </View>
            {daysToRender.map((day, dayIndex) => {
              let dayBlocks = Availableblocks.filter(
                (block) => format(parseISO(block.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
              );

              dayBlocks = dayBlocks.sort((a, b) => {
                const timeA = new Date(`2000-01-01T${blockTemplates.find(t => t.TemplateId === a.TemplateId).TimeIn}`);
                const timeB = new Date(`2000-01-01T${blockTemplates.find(t => t.TemplateId === b.TemplateId).TimeIn}`);
                return timeA - timeB;
              });

              return (
                <View key={dayIndex} style={[styles.cell, { width: cellWidth }]}>
                  {dayBlocks.map((block) => {
                    const templateInfo = blockTemplates.find(
                      (template) => template.TemplateId === block.TemplateId
                    );

                    const originalColor = templateInfo.Color;
                    const hexToRgb = (hex) => hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
                    const rgbColor = hexToRgb(originalColor);
                    const darkerRgbColor = rgbColor.map((value) => Math.round(Math.max(value - 25, 0)));
                    const timeInString = templateInfo.TimeIn;
                    const timeIn = new Date(`2000-01-01T${timeInString}`);
                    const formattedTimeIn = format(timeIn, 'HH:mm');
                    const timeOutString = templateInfo.TimeOut;
                    const timeOut = new Date(`2000-01-01T${timeOutString}`);
                    const formattedTimeOut = format(timeOut, 'HH:mm');
                    const darkerColor = `#${darkerRgbColor.map((value) => value.toString(16).padStart(2, '0')).join('')}`;

                    return (
                      <TouchableOpacity
                        key={block.BlockId}
                        style={[
                          styles.touchableCell,
                          { width: cellWidth },
                          { backgroundColor: templateInfo ? templateInfo.Color : 'transparent' },
                        ]}
                        onPress={() => handleAssignButtonVisibility(block, setSelectedUnassignedBlock, setSelectedUnassignedBlockQuantity, setSelectedUnassignedBlockDay, setSelectedUnassignedBlockTemplateId, setSelectedUnassignedBlockStatus)}
                      >
                        <View style={styles.blockInfo}>
                          <View style={styles.blockTextContainer}>
                            <Text style={styles.blockName}>{templateInfo.Name}</Text>
                            <Text style={styles.blockTime}>{formattedTimeIn} - {formattedTimeOut}</Text>
                            <Text style={styles.blockQuantity}>{`${block.Quantity}`} Blocks</Text>
                          </View>

                          {selectedUnassignedBlockDay && format(parseISO(selectedUnassignedBlockDay), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && selectedUnassignedBlockTemplateId === block.TemplateId && (
                            <TouchableOpacity
                              style={styles.checkButton}
                              onPress={() => setSelectedUnassignedBlockDay(null)}
                            >
                              <Icon name="check" size={20} color="#3498db" />
                            </TouchableOpacity>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>

          {filtredDriver.map((driver, driverIndex) => (
            <View key={driverIndex} style={styles.row}>
              <View style={[styles.cell, { width: cellWidth * 1.1 }]}>
                <Text style={styles.driverName}>{driver.Firstname}</Text>
              </View>

              {daysToRender.map((day, dayIndex) => {
                const schedule = schedules.find(
                  (s) => s.DriverId === driver.DriverId && format(parseISO(s.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );

                let scheduledBlock = null;
                let scheduledTemplate = null;

                if (schedule) {
                  const block = blocks.find((block) => block.blockId === schedule.BlockId);
                  if (block) {
                    scheduledBlock = block;
                    scheduledTemplate = blockTemplates.find((template) => template.TemplateId === block.TemplateId);
                  }
                }

                const availabilityForDriverAndDay = availability.find(
                  (s) => s.DriverId === driver.DriverId && format(parseISO(s.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );
                const cyclesForDriverAndDay = availabilityForDriverAndDay ? JSON.parse(availabilityForDriverAndDay.ListCycle) : [];

                const extractedValues = cyclesForDriverAndDay.map((value, index) => (
                  <View key={index} style={styles.availabilityCircleContainer}>
                    <View
                      style={{
                        ...styles.availabilityCircle,
                        backgroundColor: blockTemplates.find((template) => template.TemplateId === value).Color,
                      }}
                    >
                      <Text style={styles.availabilityCircleText}>{value}</Text>
                    </View>
                  </View>
                ));

                return (
                  <TouchableOpacity
                    key={dayIndex}
                    style={[
                      styles.touchableCell,
                      { width: cellWidth },
                      {
                        backgroundColor: scheduledTemplate ? scheduledTemplate.Color : 'transparent',
                        opacity: schedule ? (schedule.Status === '1' ? 1 : 0.5) : 1,
                      },
                    ]}
                    onPress={(event) => handleCellPress(driver, day, schedule, scheduledTemplate, event)}
                  >
                    <View style={styles.blockInfo}>
                      {cyclesForDriverAndDay.length > 0 && (
                        <View style={styles.availabilityContainer}>
                          {extractedValues}
                        </View>
                      )}

                      {scheduledTemplate && (
                        <View style={styles.scheduledTemplateContainer}>
                          <Text style={styles.scheduledTemplateText}>{`Block: ${scheduledTemplate.Name}`}</Text>
                        </View>
                      )}

                      {selectedUnassignedBlockDay && format(parseISO(selectedUnassignedBlockDay), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && !schedule && selectedUnassignedBlockQuantity > 0 && (
                        <View style={styles.assignButtonContainer}>
                          <TouchableOpacity
                            style={styles.assignButton}
                            onPress={() => handleAssign(driver, day, selectedUnassignedBlock, setSelectedUnassignedBlockQuantity, selectedUnassignedBlockQuantity, setSchedules, setAvailableblocks)}
                          >
                            <Text style={styles.assignButtonText}>Assign</Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      {showDeleteModal && selectedSchedule && format(parseISO(selectedSchedule.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && selectedSchedule.DriverId === driver.DriverId && (
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleConfirmDelete(selectedSchedule, setShowDeleteModal, showDeleteModal, setSchedules, setAvailableblocks)}
                        >
                          <Icon name="trash" size={24} color="#FF0000" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const handleCellPress = (driver, day, schedule, blockTemplates, event) => {
    const blockX = event.nativeEvent.pageX;
    const blockY = event.nativeEvent.pageY;

    console.log(`Selected: ${driver.Firstname} - ${format(day, 'yyyy-MM-dd')}`);
    if (schedule) {
      console.log(`Schedule status: ${schedule.Status}`);
    } else {
      console.log('No schedule for this day');
    }
    if (blockTemplates) {
      console.log(`Block: ${blockTemplates.Name}`);
    } else {
      console.log('No block scheduled');
    }
    if (schedule) {
      console.log(`Selected: ${driver.Firstname} - ${format(day, 'yyyy-MM-dd')}`);
      toggleDeleteModal(showDeleteModal, setShowDeleteModal);
      handleBlockClick(blockX, blockY, setModalPosition);
      setSelectedSchedule(schedule);
    } else {
      console.log('No schedule for this day');
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderScheduleGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  viewTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
  },
  activeButton: {
    backgroundColor: '#0056b3',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  navigationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  currentWeekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  currentWeekText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentWeekDateText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  touchableCell: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f8',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#555',
  },
  blocksHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  blockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 5,
  },
  blockTextContainer: {
    width: '75%',
  },
  blockName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  blockTime: {
    fontSize: 12,
    marginBottom: 2,
  },
  blockQuantity: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  checkButton: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
  },
  driverName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  availabilityContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  availabilityCircleContainer: {
    display: 'flex',
    marginRight: 5,
  },
  availabilityCircle: {
    width: 15,
    height: 15,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityCircleText: {
    fontSize: 10,
    color: '#fff',
  },
  scheduledTemplateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduledTemplateText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  assignButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    padding: 5,
    backgroundColor: '#FFCCCC',
    marginLeft: 'auto',
  },
});

export default ScheduleV4_3;
