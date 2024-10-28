import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table } from 'antd';
import axios, { all } from 'axios';
import {myip, mydbAPI} from '../../../IP'
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../../COMPONENTS/SearchBar/searchBar';
import ActifDrivers from '../../CIES_DASHBOARD/Manage/ActifDrivers'

const CustomPageLayout = ({route}) => {

  const [currentDateTime, setCurrentDateTime] = useState('');
  const [filtredDriver, setFiltredDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);


  const { param1, param2 } = route.params; // Destructure the passed parameters
  const navigation = useNavigation();
  let identreprise = param2;

  console.log("identreprise_managementDrivers",identreprise);



  useEffect(() => {
    // Function to get the current date and time
    const updateDateTime = () => {
      const now = new Date();
      //const formattedDateTime = now.toLocaleString(); // Formats date and time to local format
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDateTime = `${formattedDate} ${formattedTime}`;
      setCurrentDateTime(formattedDateTime);
      //fetchAllDrivers();

    };

    // Update the date and time initially and every second
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

// Fetch drivers once when the component mounts
useEffect(() => {
  fetchAllDrivers();
}, []);


  const handeSearch = (searchText) => {
    if (searchText) {
      const filtred = drivers.filter(item =>  
      //item.FirstName.includes(searchText)  || item.LastName.includes(searchText));
      item.FirstName.toLowerCase().includes(searchText.toLowerCase()) || 
      item.LastName.toLowerCase().includes(searchText.toLowerCase()));
     setFiltredDriver(filtred);
     console.log(searchText);

    } 
    else{

      //console.log("dans le else  : "+searchText);
      fetchAllDrivers();
      
      setFiltredDriver(drivers);


    }     
  };

  
  const fetchAllDrivers = async () => {
    console.log("je suis la page fetchAllDrivers ");
    try {
      const response = await axios.post('http://' + myip + ':80/link/entreprise/get_myDayDrivers.php', {id: identreprise});
      console.log(response);
      
      setDrivers(response.data);
      setFiltredDriver(response.data)

      console.log("dd: " + drivers);
      
    } catch (error) {
      //console.error('Erreur lors de la récupération des pilotes :', error);
    }  
    //console.log("driver2 : " + drivers.length);
  };   



      const columns = [
        { title: 'Nom', dataIndex: 'FirstName', key: 'nom' },
        { title: 'Téléphone', dataIndex: 'LastName', key: 'telephone' },
        { title: 'Véhicule', dataIndex: 'VehicleType', key: 'Véhicule' },
        { title: 'Actif', dataIndex: 'IsActive', key: 'IsActive' },
        {
            title: 'Détails',
            key: 'details',
            render: (text, record) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <button onClick={() => navigation.navigate('show_info_driver', { worker: record })} style={{ marginRight: 10 }}>
                +
            </button>
            </View>
            ),
        },
    ];
      

/*
    const DriverInfo = ({ filtredDriver, drivers, columns }) => {

      console.log("filtredDriver"+filtredDriver);
      console.log("drivers"+drivers);
      console.log("columns"+columns);
      
      // Vous pouvez aussi transformer les filtres en logiques plus complexes ici
      const totalDrivers = filtredDriver ? filtredDriver.length : drivers.length;
    
      return (
        <View>
            <SearchBar onUpdate={handeSearch}/>
          <Text>Total des chauffeurs : {totalDrivers}</Text>
          <br/>
          <h6>Today's Drivers</h6>
          <Table
            dataSource={filtredDriver}
            columns={columns}
            rowKey="id"
            pagination={false}  // Disable pagination
            scroll={{ y: 400 }}  // Enable scrolling for large lists
          />
        </View>
      );
    };
*/
    


  return (

  
    <View style={styles.container}>

      {/* First row: Horizontal Menu */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard {currentDateTime}</Text>
      </View>

      {/* Second row: Main content area with 3 columns */}
      <View style={styles.mainContentRow}>
        <View style={styles.LeftColumn}>
        
        {/* devrait etre dans un composant externe */}
{/*         <DriverInfo filtredDriver={filtredDriver} drivers={drivers} columns={columns} />     */} 
        <View>
            <SearchBar onUpdate={handeSearch}/>
          <Text>Total des chauffeurs : {filtredDriver ? filtredDriver.length : drivers.length}</Text>
          
          <h6>Today's Drivers</h6>
          <Table
            dataSource={filtredDriver}
            columns={columns}
            rowKey="id"
            pagination={false}  // Disable pagination
            scroll={{ y: 400 }}  // Enable scrolling for large lists
          />
        </View>
      {/* devrait etre dans un composant externe */}

          <br/>
          {/*<ActifDrivers /> */}

        </View>
        <View style={styles.middleColumn}>
          <Text>MAPS</Text>
        </View>

        <br/>

      </View>

      {/* Third row: 5 equal sections */}
      <View style={styles.footerRow}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.footerItem}>
            <Text>Section {index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  header: {
    height: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#4CAF50',
  },
  menuItem: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContentRow: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  sideColumn: {
    flex: 2,
    backgroundColor: '#f1f1f1',
    margin: 5,
    padding: 10,
    //marginLeft:'-10%',
  },


  LeftColumn: {
    flex: 3.5,
    backgroundColor: '#f1f1f1',
    margin: 5,
    padding: 10,

  },


  RightColumn: {
    flex: 4.5,
    backgroundColor: '#f1f1f1',
    margin: 5,
    padding: 10,
  },
  middleColumn: {
    flex: 6,
    height:'100%',
    backgroundColor: '#ddd',
    margin: 5,
    padding: 10,
  },
  footerRow: {
    flexDirection: 'row',
    height:'30%',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333',
  },
  footerItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomPageLayout;
