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
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import myip from '../../../../IP';
import { da } from 'date-fns/locale';
import Delete_Schedule_Modal from "../../../../Component/Modal/Delete_Schedule_Modal";
import SearchBar from "../../../../Component/SearchBar/searchBar";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import DeleteConfirmationModal from '../../../../Component/Modal/Delete_Schedule_Modal';


const ScheduleV4_3 = () => {



  const [filtredDriver, setFiltredDriver] = useState([]);



  const [drivers, setDrivers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [Availableblocks, setAvailableblocks] = useState([]);

  const [blockTemplates, setBlockTemplates] = useState([]);
  const [viewType, setViewType] = useState('weekly');
  const [currentWeek, setCurrentWeek] = useState(new Date()); // Current week
  const [availability, setAvailability] = useState([]);


  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedUnassignedBlock, setSelectedUnassignedBlock] = useState(null);

  const [selectedUnassignedBlockDay, setSelectedUnassignedBlockDay] = useState(null);
  const [selectedUnassignedBlockQuantity, setSelectedUnassignedBlockQuantity] = useState(0);
  const [selectedUnassignedBlockStatus, setSelectedUnassignedBlockStatus] = useState(false);
  const [selectedUnassignedBlockTemplateId, setSelectedUnassignedBlockTemplateId] = useState(false);

  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const BLOCK_WIDTH = 100; // Set the width of your block
  const MODAL_HEIGHT = 150; // Set the height of your modal
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    console.log("ttttttttttttttttttttttt");
  };
  
  
  const handeSearch = (searchText) => {
    if (searchText) {
      const filtred = drivers.filter(item =>  
      item.Firstname.includes(searchText)  || item.Lastname.includes(searchText));
     setFiltredDriver(filtred);
    } 
    else{
      //console.log("dans le else  : "+searchText);
      fetchDrivers();
    }     
  };
  
const handleCheckUnassignedBlock =()=>{

  setSelectedUnassignedBlock(null);
}
// Function to handle block click
const handleBlockClick = (blockX, blockY) => {

  const BLOCK_WIDTH = -28; // Set the width of your block
const MODAL_HEIGHT = 125; // Set the height of your modal
  // Calculate the position relative to the block
  const modalX = blockX + BLOCK_WIDTH; // Adjust this value as needed
  const modalY = blockY - MODAL_HEIGHT; // Adjust this value as needed

  // Set the modal position and show the modal
  setModalPosition({ x: modalX, y: modalY });
 // toggleDeleteModal();
};
const switchToViewType = (type) => {
  setViewType(type);
};

const handleConfirmDelete = async (schedule) => {
  const ScheduleId = schedule.ScheduleId;
  

  const selectedScheduleData = {
    ScheduleId: schedule.ScheduleId,
    BlockId: schedule.BlockId,
    
  };

  console.log(ScheduleId);
  try {
    const response = await axios.post('http://' + myip + ':80/api_schedule/delete_schedule.php', selectedScheduleData, {
      headers: {
        'Content-Type': 'application/json',
        // Autres en-têtes si nécessaires
      },
    });
    setShowDeleteModal(!showDeleteModal);
    refreshData();
    console.log('Schedule deleted:', response.data);
    // Gérer la réponse de l'API après la création du schedule ici
  } catch (error) {
    console.error('Error deleting schedule:', error);
    // Gérer les erreurs ici
  }


};
  // Fonction pour vérifier si le bouton Assign doit être affiché pour la journée spécifique
  const shouldShowAssignButton = (day) => {
    if (selectedUnassignedBlock.blockId) {
      const blockDate = format(parseISO(selectedUnassignedBlock.Date), 'yyyy-MM-dd');
      return format(day, 'yyyy-MM-dd') === blockDate;
    }
    return false;
  };
  const createSchedule = async (day, driver) => {
    console.log(selectedUnassignedBlock.blockId);
    const scheduleData = {
      ScheduleId: generateScheduleID(day,selectedUnassignedBlock.Name,driver.DriverId), // Remplacez 'generated_schedule_id' par votre ID généré
      BlockId: selectedUnassignedBlock.blockId, // Remplacez 'block_id_value' par l'ID de bloc approprié
      Date: day, // Remplacez 'scheduled_date' par la date appropriée
      Status: '0', // Remplacez 'scheduled_status' par le statut approprié
      DriverId: driver.DriverId, // Remplacez 'driver_id_value' par l'ID du conducteur approprié
      // Ajoutez d'autres champs si nécessaire pour créer un nouvel élément de l'horaire
    };
  
    try {
      const response = await axios.post('http://' + myip + ':80/api_schedule/add_schedule.php', scheduleData, {
        headers: {
          'Content-Type': 'application/json',
          // Autres en-têtes si nécessaires
        },
      });
   // Mise à jour de la quantité du bloc disponible après l'assignation réussie
 
    refreshData();

      console.log('Schedule created:', response.data);
      // Gérer la réponse de l'API après la création du schedule ici

    } catch (error) {
      console.error('Error creating schedule:', error);
      // Gérer les erreurs ici
    }
  };
  
  // Fonction pour gérer la visibilité du bouton Assign en fonction de la journée sélectionnée
  const handleAssignButtonVisibility = (block) => {
    setSelectedUnassignedBlock(block);
    setSelectedUnassignedBlockQuantity(block.Quantity);
    setSelectedUnassignedBlockDay(block.Date);
    setSelectedUnassignedBlockTemplateId(block.TemplateId)
    setSelectedUnassignedBlockStatus(true);
    console.log(block.Date);
  };

const handleAssign = (driver, day, selectedUnassignedBlock) => {
  // Ici, vous pouvez implémenter la logique pour attribuer le block au chauffeur pour cette journée
  if (createSchedule(day,driver)) {

    
    setSelectedUnassignedBlockQuantity(selectedUnassignedBlockQuantity-1);

    {console.log("La quantite du block : " + selectedUnassignedBlockQuantity)}

  } else {
    alert('Please select a driver and an unassigned block before assigning.');
  }
};



  const getWeeksToDisplay = () => {
    return viewType === 'weekly' ? 1 : 2;
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentWeek);
    const end = endOfWeek(addWeeks(start, getWeeksToDisplay() - 1));
    return eachDayOfInterval({ start, end });
  };

  const goToNextWeek = () => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, getWeeksToDisplay()));
  };

  const goToPreviousWeek = () => {
    setCurrentWeek((prevWeek) => subWeeks(prevWeek, getWeeksToDisplay()));
  };
  function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }


  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        'http://' + myip + ':80/api_schedule/get_alldrivers.php'
      );
      if (response.data) {
        setDrivers(response.data);
        setFiltredDriver(response.data);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };
  // Schedule ID GENERATOR ************************************************************************ ScheduleID GENERATOR
  const generateScheduleID = (date, blockName, driverName) => {
    const dateString = formatDate(date); // Format the date as needed
    
    // Concatenate the date, block name, and driver name
    const combinedInfo = `${dateString}-${blockName}-${driverName}`;
    
    // Perform a hash function or use a unique identifier generation method (e.g., UUID)
    // Here's an example using a simple hash (not collision-proof)
    const hashCode = hashString(combinedInfo); // You'll need to implement your hash function
    
    // Ensure the hash code or generated ID is unique and suitable for your database
    
    return hashCode; // Return the generated unique ID
  };
  
  // Example date formatting function
  const formatDate = (date) => {
    // Format the date as needed (e.g., 'yyyy-MM-dd')
    // Replace this with your date formatting logic using date-fns or another library
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  
  // Example hash function (simple and not suitable for production)
  const hashString = (str) => {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  };
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        'http://' + myip + ':80/api_schedule/get_schedule.php'
      );
      if (response.data) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const fetchBlocks = async () => {
    try {
      const response = await axios.get('http://' + myip + ':80/api_schedule/get-all-block.php');
      if (response.data) {
        setBlocks(response.data);
        
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };
  const fetchAvailableBlocks = async () => {
    try {
      const response = await axios.get('http://' + myip + ':80/api_schedule/get_available_blocks.php');
      if (response.data) {
        setAvailableblocks(response.data);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };
  const fetchBlockTemplates = async () => {
    try {
      const response = await axios.get(
        'http://' + myip + ':80/api_schedule/get_all_blocktemplate.php');
      if (response.data) {
        setBlockTemplates(response.data);
      }
    } catch (error) {
      console.error('Error fetching block templates:', error);
    }
  };
  const fetchAvailabily = async () => {
    try {
      const response = await axios.get(
        'http://' + myip + ':80/api_schedule/get_availability.php');
      if (response.data) {
        setAvailability(response.data);
      }
    } catch (error) {
      console.error('Error fetching block templates:', error);
    }
  };
  const refreshData = async () => {
  fetchSchedules();
  fetchBlockTemplates() ;
  //fetchBlocks();
  fetchDrivers();
  fetchAvailableBlocks();
  
  // Fetch data from the API
 console.log('Data refreshed at ', new Date());
 
   
  };
  const blockassignementHandler = (UnassignedBlock) => {
   const selectedDate = UnassignedBlock.Date;
  };
  

  useEffect(() => {
    fetchDrivers();
    fetchSchedules();
    fetchBlocks();
    fetchBlockTemplates();
    fetchAvailableBlocks();
    fetchAvailabily();
    console.log("Current week"+currentWeek);
  }, []);

  const renderHeader = () => {
    const viewTypes = ['weekly', 'bi-weekly'];
  
    const firstDayOfWeek = startOfWeek(currentWeek);
    const lastDayOfWeek = endOfWeek(currentWeek);
  
    return (
      <View style={styles.header}>
        {viewTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => switchToViewType(type.toLowerCase())}
            style={[
              styles.viewButton,
              viewType === type.toLowerCase() && styles.activeButton,
            ]}
          >
            <Text style={styles.viewButtonText}>{type}</Text>
          </TouchableOpacity>
        ))}
  
        <TouchableOpacity style={styles.navigationButton} onPress={goToPreviousWeek}>
          <Text style={styles.navigationButtonText}>Previous {viewType}</Text>
        </TouchableOpacity>
  
        {/* Display the current week */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Current Week: </Text>
          <Text>{format(firstDayOfWeek, 'MMM d')}</Text>
          <Text> - </Text>
          <Text>{format(lastDayOfWeek, 'MMM d')}</Text>
        </View>
  
        <TouchableOpacity style={styles.navigationButton} onPress={goToNextWeek}>
          <Text style={styles.navigationButtonText}>Next {viewType}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
const renderScheduleGrid = () => {
  let daysToRender = getWeekDays();
  const cellWidth = (Dimensions.get('window').width / daysToRender.length) * 0.72;
// Dates Part Orizantal
  return (
<View>
    <View> 
      

      
    </View>
    <View style={styles.gridContainer}>
      
      <View style={styles.row}>
        

        <View style={[styles.cell, { width: cellWidth * 1.1 }]} >
        <SearchBar onUpdate={handeSearch}/>

        </View>
        
        {daysToRender.map((day, index) => (
          
          <View key={index} style={[styles.cell, { width: cellWidth }]}>
            
            <Text>{format(day, 'EEE')}</Text>
            <Text>{format(day, 'MM/dd')}</Text>
          </View>
        ))}
      </View>
      
 

  
      <View style={styles.row}>
        <View style={[styles.cell, { width: cellWidth*1.1 }]}>
          <Text>Blocks</Text>
        </View>
        {daysToRender.map((day, dayIndex) => {
          const dayBlocks = Availableblocks.filter(
            (block) => format(parseISO(block.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          return (
            <View key={dayIndex} style={[styles.cell, { width: cellWidth }]}>
              {dayBlocks.map((block) => {
                const templateInfo = blockTemplates.find(
                  (template) => template.TemplateId === block.TemplateId
                );
                const originalColor = templateInfo.Color;

                // Convert the hex color to RGB values
                const hexToRgb = (hex) =>
                  hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
                
                const rgbColor = hexToRgb(originalColor);
                
                // Reduce brightness by 20%
                const darkerRgbColor = rgbColor.map((value) =>
                  Math.round(Math.max(value - 25, 0))
                );
                const timeInString = templateInfo.TimeIn;
                const timeIn = new Date(`2000-01-01T${timeInString}`); // Use a fixed date (here, '2000-01-01') for formatting time
                const formattedTimeIn = format(timeIn, 'HH:mm');


                const timeOutString = templateInfo.TimeOut;
                const timeOut = new Date(`2000-01-01T${timeOutString}`); // Use a fixed date (here, '2000-01-01') for formatting time
                const formattedTimeOut = format(timeOut, 'HH:mm');
                // Convert the RGB back to hex
                const darkerColor = `#${darkerRgbColor.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
                
                return (
                 
                  <TouchableOpacity
                    key={block.BlockId}
                    style={[
                      styles.touchableCell,
                      { width: cellWidth },
                      {
                        backgroundColor: templateInfo ? templateInfo.Color : 'transparent',
                      },
                    ]}
                    onPress={() =>
                      handleAssignButtonVisibility(block, day) // Passes the block and its date for visibility control
                    }
                  >
                 <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', width: '100%' }}>
                  {/* Part 1 */}
                  <View style={{ padding: 5 , width: cellWidth*.75}}>
                    <Text style={{ padding: 1, textTransform:'capitalize', fontWeight:'bold' }}>{templateInfo.Name}</Text>
                    <Text>{formattedTimeIn} - {formattedTimeOut}</Text>
                    <Text>{`${block.Quantity}`} Blocks</Text>
                  </View>
                  {/* Part 1 */}
                  
                  {/* Part 2 */}
                  {selectedUnassignedBlockDay && format(parseISO(selectedUnassignedBlockDay), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && selectedUnassignedBlockTemplateId === block.TemplateId && (
                    <TouchableOpacity
                    style={{
                      justifyContent: 'center', // Center vertically
                      alignItems: 'center', // Center horizontally
                      width: cellWidth * 0.25,
                      height: '100%',
                      padding: 5,
                      backgroundColor: '#2980b9',
                    }}
                    onPress={() => setSelectedUnassignedBlockDay(null)}
                  >
                    <Icon name="check" size={20} color="#3498db" />
                  </TouchableOpacity>
                  )}
                  {/* Part 2 */}
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
          <View style={[styles.cell, { width: cellWidth*1.1 }]}>
            <Text>{driver.Firstname}</Text>
          </View>
          
          {daysToRender.map((day, dayIndex) => {
            const schedule = schedules.find(
              (s) =>
                s.DriverId === driver.DriverId &&
                format(parseISO(s.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );
            
            let scheduledBlock = null;
            let scheduledTemplate = null;
            let currentAvailablityCycles = null;
  
            if (schedule) {
             // console.log("schedule du driver " + driver.Name +" : " + schedule);
              const block = blocks.find((block) => block.blockId === schedule.BlockId);

              if (block) {
                scheduledBlock = block;
                scheduledTemplate = blockTemplates.find((template) => template.TemplateId === block.TemplateId);
             }
           }

           const availabilityForDriverAndDay = availability.find(
            (s) =>
              s.DriverId === driver.DriverId &&
              format(parseISO(s.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );
  
  const cyclesForDriverAndDay = availabilityForDriverAndDay ? JSON.parse(availabilityForDriverAndDay.ListCycle) : [];


 const extractedValues = cyclesForDriverAndDay.map((value, index) => (
  <div key={index} style={{ display: 'flex', marginRight: '5px' }}>
    <div
      style={{
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: blockTemplates.find((template) => template.TemplateId === value).Color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '1px', // Espace entre les cercles
      }}
    >
      <p style={{ fontSize: '10px', margin: 0 }}>{value}</p>
    </div>
  </div>
));


  return ( 
              <TouchableOpacity
                key={dayIndex}
                style={[
                  styles.touchableCell,
                  { width: cellWidth },
                  {
                    backgroundColor: scheduledTemplate
                      ? scheduledTemplate.Color
                      : 'transparent',
                    opacity: schedule ? schedule.Status === '1' ? 1 : 0.5 : 1, // Reduced opacity if the block is not confirmed
                  },
                ]}
                onPress={(event) =>
                 handleCellPress(driver, day, schedule, scheduledTemplate, event)
                }
              >


<View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', width: '100%' }}>


                {/* Afficher les détails de la disponibilité */}
                {cyclesForDriverAndDay.length > 0 && (
                  <View style={{ flexDirection: 'row', position: 'absolute', top: 2 , right:-1 }}>
                    {extractedValues}
                  </View>
                )}


  {scheduledTemplate && (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ textAlign: 'center' }}>{`Block: ${scheduledTemplate.Name}`}</Text>
    </View>
  )}



                  {selectedUnassignedBlockDay && format(parseISO(selectedUnassignedBlockDay), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && !schedule  && selectedUnassignedBlockQuantity > 0 &&(
                  
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center', // Center text horizontally
                      alignItems: 'center', // Center text vertically
                    }}
                    onPress={() => handleAssign(driver, day, selectedUnassignedBlock)}
                  >
                    <Text>Assign</Text>
                  </TouchableOpacity>
                </View>

                  )}






                  {showDeleteModal && selectedSchedule && format(parseISO(selectedSchedule.Date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && selectedSchedule.DriverId === driver.DriverId &&(
                    <TouchableOpacity style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      height: '100%',
                      padding: 5,
                      backgroundColor: '#FFCCCC',
                      marginLeft: 'auto', // Pushes the TouchableOpacity to the right
                    }}
                    onPress={() => {handleConfirmDelete(selectedSchedule)}}
                    >
                      <Icon name="trash" size={24} color="#FF0000" />
                    </TouchableOpacity>
                  )}



</View>

                  
                  { /*showDeleteModal && <Delete_Schedule_Modal
                    isVisible={showDeleteModal}
                    onConfirm={() => {
                    handleConfirmDelete(selectedSchedule);
                      setShowDeleteModal(false); // Hide the modal after confirmation
                      console.log(selectedSchedule);
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                    position={modalPosition}
                  />
                  */}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
    </View>
  );
};

// ... (rest of your code remains unchanged)




 


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
    toggleDeleteModal();
    handleBlockClick(blockX, blockY);
    setSelectedSchedule(schedule);
  } else {
    console.log('No schedule for this day');
  }
};


  return (

    <View style={styles.container}>
          {renderHeader()}
          {/* Render other components */}
        
          {renderScheduleGrid()}
        </View>
      );
};







const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'blue',
  },
  activeText: {
    fontSize: 16,
    color: 'red', // Change color for the active view type
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    margin: .5,
    borderColor: '#ccc',
  },
  cell: {
   
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    justifyContent: 'center',
    
    alignItems: 'center',
  },
  touchableCell: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 0,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  viewButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  navigationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navigationButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default ScheduleV4_3;