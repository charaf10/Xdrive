import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { parseISO,format,addDays, addWeeks, subWeeks, startOfWeek, eachDayOfInterval } from 'date-fns';
import { Table, Button, Select, Checkbox} from 'antd'; // Utilisation de composants de l'Ant Design pour une interface moderne
//import myip from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

import { IoMdRefresh } from 'react-icons/io';

// ... (previous imports and code remain unchanged)

const AvailabilityManagementGrid = () => {
  const [drivers, setDrivers] = useState([]);
  const [blockTemplates, setBlockTemplates] = useState([]);
 // const [selectedCycles, setSelectedCycles] = useState([]);
  const [listCycleToPass, setListCycleToPass] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [existingAvailabilities, setExistingAvailabilities] = useState([]);
  const [mode, setMode] = useState(null);

  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date())); // Start of the current week
  const weeksToShow = 5; // Nombre de semaines à afficher

  // Include state for handling the repeat option
  const [repeatVisibility, setRepeatVisibility] = useState(false);

  useEffect(() => {
    // Fetch drivers and block templates data
    // Add your API endpoints for fetching driver and block template data

    
    fetchAvailabilities();
    fetchDrivers();
    fetchBlockTemplates();
  }, []);

  const fetchDrivers = async () => {
    // Fetch drivers
    try {
      const response = await axios.get(
        `http://${myip}:80/${mydbAPI}/get_alldrivers.php`
        //`http://${myip}:80/${mydbAPI}
      );
      if (response.data) {
        setDrivers(response.data);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const fetchBlockTemplates = async () => {
    // Fetch block templates
    try {
      const response = await axios.get(
        `http://${myip}:80/${mydbAPI}/get_all_blocktemplate.php`);
      if (response.data) {
        setBlockTemplates(response.data);
      }
    } catch (error) {
      console.error('Error fetching block templates:', error);
    }
  };

  const fetchAvailabilities = async () => {
    // Fetch block templates
    try {
      const response = await axios.get(
        `http://${myip}:80/${mydbAPI}/get_availability.php`);
      if (response.data) {
        setExistingAvailabilities(response.data);
      }
    } catch (error) {
      console.error('Error fetching availabilities:', error);
    }
  };
  // ... (previous functions remain unchanged)
  const RepeatVisibilityHandler = (driverId,selectedDay) => {
    setRepeatVisibility(!repeatVisibility)
    setSelectedDriver(driverId);
    setSelectedDate(selectedDay);
    const existingCycles = getExistingAvailabilitiesForDriverAndDay(driverId, selectedDay);
  //console.log("existingCycles in checkbocOnchange : " + existingCycles);
   setListCycleToPass( listCycleToPass.length > 0 ? listCycleToPass : existingCycles)

    console.log("driverId in RepeatVisibilityHandler : " + driverId);
    console.log("selectedDay in RepeatVisibilityHandler : " + selectedDay);
    console.log("repeatVisibility in RepeatVisibilityHandler : " + repeatVisibility);
  };
  const navigateToNextWeek = () => {
    setCurrentWeek((prevWeek) => addWeeks(prevWeek, 1));
  };

  const navigateToPreviousWeek = () => {
    setCurrentWeek((prevWeek) => subWeeks(prevWeek, 1));
  };

  const getDaysForWeek = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 0 }); // Start of the current week (Sunday)
    const end = addDays(start, 6); // End of the current week (Saturday)
    return eachDayOfInterval({ start, end });
  };

  const CreateAvailability = (driverId, day,repeatStatus) => {
    // Gérez les cycles de disponibilité sélectionnés pour le chauffeur et le jour
    // Construct the availability object to be sent to the backend
   // const existingCycles = getExistingAvailabilitiesForDriverAndDay(driverId, day);
    //const ListCycleToPass = existingCycles && existingCycles.length > 0 ? existingCycles : selectedCycles;

console.log("ListCycleToPass : "+listCycleToPass);
    const availabilityData = {
      AvailabilityId: generateID(),
      DriverId: driverId,
      Date: format(day, 'yyyy-MM-dd'), // Format the date
      ListCycle: listCycleToPass,
      RepeatStatus: repeatStatus,
    };

    // Make an API call to save the availability
    axios.post(
     `http://${myip}:80/${mydbAPI}/add_availability.php`, availabilityData)
      .then((response) => {
        // Handle success response if needed
        fetchAvailabilities();
        
        console.log('Availability saved successfully:', response.data);
      })
      .catch((error) => {
        // Handle error response if needed
        console.error('Error saving availability:', error);
      });
  };



  const handleRepeatChange = (value) => {
    // Update state for the repeat option
   
  };

  const updateAvailability = (driverId, day, NewListCycle) => {

    console.log("here driverId : " +driverId);
    const data = {
      DriverId: driverId,
      Date: format(day, 'yyyy-MM-dd'),
      NewListCycle: NewListCycle,
      RepeatStatus: 'false',
    };
    axios.post(`http://${myip}:80/${mydbAPI}/update_availability.php`, data)
    .then(response => {
      console.log('Block updated successfully!', response.data);
      // Handle success, maybe reset the InputNumber or perform other operations
      //setRepeatVisibility(true);
      console.log("NewListCycle in update: "+ NewListCycle);
      setListCycleToPass(NewListCycle);
      fetchAvailabilities();
      

    })
    .catch(error => {
      console.error('Error creating block:', error);
      // Handle the error or show a message to the user
    });
  };

 /* const handleOnchange=(selectedCycle)=>{
     
        setSelectedCycles(selectedCycle);
        console.log(selectedCycles);
  }*/
  function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  // Function to get existing availabilities for a specific driver and day
const getExistingAvailabilitiesForDriverAndDay = (driverId, day) => {
  
  // Filter existing availabilities for the specific driver and day
  const existingAvailabilitiesForDriverAndDay = existingAvailabilities.find(
    (availability) => availability.DriverId === driverId && availability.Date === format(day, 'yyyy-MM-dd')
  );
  const cyclesForDriverAndDay = existingAvailabilitiesForDriverAndDay ? JSON.parse(existingAvailabilitiesForDriverAndDay.ListCycle) : [];
  // Extract and return cycles for the selected driver and day

  return cyclesForDriverAndDay ;

}
const getExistingAvailabilityStatus = (driverId, day) => {
  
  // Filter existing availabilities for the specific driver and day
  const existingAvailability = existingAvailabilities.find(
    (availability) => availability.DriverId === driverId && availability.Date === format(day, 'yyyy-MM-dd')
  );
  const DataExistingAvailability = existingAvailability ? JSON.parse(existingAvailability.RepeatStatus) : [];
  // Extract and return cycles for the selected driver and day
console.log("Status : " + DataExistingAvailability);
  return DataExistingAvailability ;

}

const handleOnBlur = (driverId, day ) => {
  const existingCycles = getExistingAvailabilitiesForDriverAndDay(driverId, day);
  
  let repeatStatus = "false";
  if (existingCycles && existingCycles.length > 0) {
    //const existingCycleIds = existingCycles.map((cycle) => cycle.TemplateId);
    //const selectedCycleIds = selectedCycles.map((cycle) => cycle.TemplateId);

    // Vérifie si les valeurs sélectionnées sont différentes des valeurs existantes
    if (JSON.stringify(existingCycles) !== JSON.stringify(listCycleToPass)) {
      // Si les valeurs sont différentes, mettez à jour les disponibilités avec les nouvelles valeurs
      //updateAvailability( driverId, day, selectedCycles);
    }
    // Sinon, les valeurs n'ont pas changé, pas besoin de mettre à jour
  } else {
    // Aucune valeur existante, créez de nouvelles disponibilités avec les valeurs sélectionnées
    CreateAvailability(driverId, day, repeatStatus);
    
  }
};
const handleOnChange = (selectedCycles,driverId, day ) => {
  const existingCycles = getExistingAvailabilitiesForDriverAndDay(driverId, day);
  

  if (existingCycles && existingCycles.length > 0) {
    //const existingCycleIds = existingCycles.map((cycle) => cycle.TemplateId);
    //const selectedCycleIds = selectedCycles.map((cycle) => cycle.TemplateId);

    // Vérifie si les valeurs sélectionnées sont différentes des valeurs existantes
    if (JSON.stringify(existingCycles) !== JSON.stringify(selectedCycles)) {
      // Si les valeurs sont différentes, mettez à jour les disponibilités avec les nouvelles valeurs
      updateAvailability( driverId, day, selectedCycles);
      
    }
    // Sinon, les valeurs n'ont pas changé, pas besoin de mettre à jour
  } else {
    // Aucune valeur existante, créez de nouvelles disponibilités avec les valeurs sélectionnées
   // setSelectedCycles(selectedCycles) ;
    setListCycleToPass(selectedCycles);
  }
};

const handleCheckboxChange = (isChecked, day, driverId) => {
  //const existingCycles = getExistingAvailabilitiesForDriverAndDay(driverId, day);
  //console.log("existingCycles in checkbocOnchange : " + existingCycles);
   //setListCycleToPass( selectedCycles.length > 0 ? selectedCycles : existingCycles)


  if (isChecked) {
    

    const dayCode = day.getDay();
    
    let repeatStatus = "true";

    //setListCycleToPass( selectedCycles.length > 0 ? selectedCycles : existingCycles)

    getDaysInRange(day, dayCode).map((d) => {
      let date = new Date(d);
      CreateAvailability(driverId, date, repeatStatus);
    });


    setRepeatVisibility(!repeatVisibility);

    // Autres actions ou enregistrements si nécessaires
  } else {
    console.log('Checkbox for', format(day, 'EEE'), 'was unchecked');
    // Actions telles que la suppression de la disponibilité pour ce jour, etc.
    // Appelez votre fonction de suppression de disponibilité ici
  }
};



const getDaysInRange = (selectedDate, dayCode) => {
  const days = [];
  const startDate = new Date(selectedDate); 
  const endDate = new Date(selectedDate);// Plusieurs mois plus tard, par exemple 6 mois
  endDate.setDate(selectedDate.getDate() + 30);
  startDate.setDate(selectedDate.getDate() +1);

  /*const start = new Date(selectedDate); // Utiliser une copie du jour sélectionné
  while (start.getDay() !== dayCode) {
    // Trouver le premier jour de la semaine correspondant au jour sélectionné
    start.setDate(start.getDate() + 1);
  }
*/
  while (startDate <= endDate) {
    // Parcourir les jours à partir du jour sélectionné
    const formattedDate = startDate.toISOString().split('T')[0]; // Format en 'yyyy-MM-dd'
    days.push(formattedDate); // Ajouter le jour au tableau
    startDate.setDate(startDate.getDate() + 7); // Aller au jour suivant de la semaine suivante
  }

  return days;
};






const getBlockTemplateName = (templateId) => {
  const blockTemplate = blockTemplates.find((template) => template.TemplateId === templateId);
  return blockTemplate ? blockTemplate.Name : ''; // Return the name if found, otherwise an empty string
};


  const columns = [
    {
      title: 'Driver',
      dataIndex: 'Firstname',
      key: 'Name',
    },
    ...getDaysForWeek().map((day, index) => ({
      title: format(day, 'EEE yyyy/MM/dd'),
      dataIndex: `day-${index}`,
      key: `day-${index}`,
      render: (text, record) => (

        <div>
          <Select
            mode="multiple"
            placeholder="Select availability"
            style={{ width: 200 }}
            value={getExistingAvailabilitiesForDriverAndDay(record.DriverId, day)?.length > 0
              ? getExistingAvailabilitiesForDriverAndDay(record.DriverId, day)
              : undefined}

            onChange={(selectedCycles) =>
              handleOnChange(selectedCycles, record.DriverId, day) 
              //handleAvailabilityChange(record.DriverId, day, selectedCycles)
            }
            onBlur={
              ()=> handleOnBlur(record.DriverId, day)
            }
          >
            

            {blockTemplates.map((blockTemplate) => (
             
              <Select.Option
                key={blockTemplate.TemplateId}
                value={blockTemplate.TemplateId}
                style={{ color: blockTemplate.Color }}
              >
                {blockTemplate.Name}
              </Select.Option>
            ))}



          </Select>



          {
             getExistingAvailabilitiesForDriverAndDay(record.DriverId, day) && getExistingAvailabilitiesForDriverAndDay(record.DriverId, day).length > 0 && (
                getExistingAvailabilityStatus(record.DriverId, day) == false ? (
                  <View>
                    
                    
                    <View>
                            <TouchableOpacity onPress={() => (RepeatVisibilityHandler(record.DriverId, day))}>

                              <Text>Set repeat</Text>
                            </TouchableOpacity>
                    </View>
    
                    
                    
                    
                  </View>
                  

                ) : <IoMdRefresh size={20} color="green" />
              )
          }
          {repeatVisibility && selectedDriver === record.DriverId && format(selectedDate, 'yyyy-MM-dd') ===format(day, 'yyyy-MM-dd') &&(
                      <View>
                          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, day, record.DriverId)}>
                                Repeat
                              </Checkbox>
                    </View>
                    
    )}
        </div>
        
      ),
    })),
  ];

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Manage Driver Availability</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={navigateToPreviousWeek}>
        <Text style={styles.buttonText}>Previous Week</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToNextWeek}>
        <Text style={styles.buttonText}>Next Week</Text>
      </TouchableOpacity>
    </View>

    <Table dataSource={drivers} columns={columns} />
    {/* Other components here */}
  </View>

   
  );
};





  const styles = {
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#2284b3',
      paddingVertical: 15,
      borderRadius: 5,
      width: '48%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    // Other styles for different components
    // Other styles for different components
    // Add more styles as needed for different components
  };
export default AvailabilityManagementGrid;