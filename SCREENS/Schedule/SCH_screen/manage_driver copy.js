// DriversListPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image  } from 'react-native';
import axios, { all } from 'axios';
//import myip from '../../../IP';
import { myip, mydbAPI } from "../../../IP"; // Importez avec les accolades

import MaModalCreate  from '../../../Component/Modal/modalCreate';
import MaModalUpdateDelete  from '../../../Component/Modal/modalUpdateDelete';
import Create_driver from '../../../Component/Screen/admin/create_driver'; // Assurez-vous d'importer votre composant correctement
import WorkerDetailScreen from '../../../SCREENS/Schedule/SCH_composant/driver/WorkerDetailScreen'; // Assurez-vous d'importer votre composant correctement
import ListWorkers from '../../../SCREENS/Schedule/worker/ListWorkers'; // Assurez-vous d'importer votre composant correctement
import Show_info_driver from '../../../Component/Screen/admin/show_info_driver'; // Assurez-vous d'importer votre composant correctement
import SearchBar from "../../../Component/SearchBar/searchBar";


const DriversListPage = ({navigation}) => {

  //console.log("je suius le manage_driver");

    /*=========================================VARIABLES=========================================== */

  const [selectedDriverId, setSelectedDriverId] = useState(null);


  const [filtredDriver, setFiltredDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [modalCreateVisible, setmodalCreateVisible] = useState(false);
  const [modalUpdateDelete, setmodalUpdateDelete] = useState(false);

    /*================================ACTIVATE/DESACTIVATE MODAL================================= */

  const openCreateModal = () => {
    setmodalCreateVisible(true);
  };

  const closeCreateModal = () => {
    console.log("clicker");
    setmodalCreateVisible(false);
    fetchAllDrivers();
  };

  const openUpdateDeleteModal = () => {
    setmodalUpdateDelete(true);
    //console.log("selected driver dans (openMoreInfoModal)" + selectedDriver);

  };

  const closeUpdateDeleteModal = async() => {
    setmodalUpdateDelete(false);
    fetchAllDrivers();
    setSelectedDriverId(null);
  };


  /*======================================LES FONCTIONS============================================= */



    const fetchAllDrivers = async () => {
      //console.log("je suis la page manage_driver ");
      try {
        const response = await axios.get(`http://${myip}:80/${mydbAPI}/get_alldrivers.php`);
        setDrivers(response.data);
        setFiltredDriver(response.data)

      } catch (error) {
        //console.error('Erreur lors de la récupération des pilotes :', error);
      }  
      //console.log("driver2 : " + drivers.length);
    };   
    


/*

        const handleSelect = (driver) => {
          const newSelectedDriverId = driver.DriverId === selectedDriverId ? null : driver.DriverId;
          setSelectedDriverId(newSelectedDriverId);
          openUpdateDeleteModal();
          console.log("DriverId " + driver.DriverId);
          console.log("Selected driver dans (handleSelect) " + newSelectedDriverId);
        };


        const handleSelect = (driver) => {
          const newSelectedDriverId = driver.DriverId === selectedDriverId ? null : driver.DriverId;
          setSelectedDriverId(newSelectedDriverId);
        
          if (newSelectedDriverId) {
            openUpdateDeleteModal();
          } else {seUpdateDelet
            cloeModal();
          }

          console.log("DriverId " + driver.DriverId);
          console.log("Selected driver dans (handleSelect) " + newSelectedDriverId);
        };
        
*/
        


    const handleSelect = (driver) => {
      //setSelectedDriver(driver.DriverId === selectedDriver ? null : driver.DriverId);
      console.log("DriverId " + driver.DriverId);

      const newSelectedDriverId = driver.DriverId === selectedDriverId ? null : driver.DriverId;
      setSelectedDriverId(newSelectedDriverId);
      setSelectedDriver(driver.DriverId);
    
      if (newSelectedDriverId) 
      {
        openUpdateDeleteModal();
      } 
      else 
      {
        setmodalUpdateDelete(false);
      }
      console.log("selected driver dans (handleSelect)" + selectedDriver);
    };


  const handeSearch = (searchText) => {
    if (searchText) {
      const filtred = drivers.filter(item =>  
      item.Firstname.includes(searchText)  || item.Lastname.includes(searchText));
     setFiltredDriver(filtred);
    } 
    else{
      //console.log("dans le else  : "+searchText);
      fetchAllDrivers();
    }     
  };

  /*=========================================USE EFFECT=========================================== */


  useEffect(() => {
    fetchAllDrivers();

    /*    
    const interval = setInterval(() => {
      console.log("test");
      fetchAllDrivers();
    }, []);

    return () => {
      clearInterval(interval);
    };
*/
      }, []);

 
      const renderDriverItem = ({ item }) => (
        <View>
          <View>

            <ListWorkers worker={item}/>

{/*
            <TouchableOpacity
              style={[styles.driverItem, { borderColor: item.DriverId === selectedDriver ? 'red' : 'black' }]}
              onPress={() => handleSelect(item)}>
              <Text style={styles.driverName}>{item.Firstname + " "}</Text>
              <Text style={styles.driverName}>{item.Lastname}</Text>
            </TouchableOpacity>


    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('WorkerDetailScreen', { workerId: item.DriverId })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <Text style={styles.workerName}>{item.Firstname + " "}</Text>
      <Text style={styles.workerName}>{item.Lastname + " "}</Text>
      <Text style={styles.workerName}>{item.Email}</Text>
    </TouchableOpacity>

*/}

          </View>



{/*
          <MaModalMoreInfoDriver visible={modalMoreInfoVisible} closeUpdateModal={() => {closeMoreInfoModal(); setSelectedDriverId(null);}}>
            <Show_info_driver driver={item} />
          </MaModalMoreInfoDriver>



          <MaModalMoreInfoDriver visible={modalMoreInfoVisible} closeUpdateModal={closeMoreInfoModal}>
            <Show_info_driver driver={selectedDriverId ? drivers.find(driver => driver.DriverId === selectedDriverId) : null} />
          </MaModalMoreInfoDriver>
*/}

        </View>
      );
      
  
  return (
    <View style={styles.container}>


    <View style={styles.containerTouchable}>
      <SearchBar onUpdate={handeSearch}/>
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
          <Text style={{color: "white"}}>+</Text>
          <MaModalCreate visible={modalCreateVisible} closeCreateModal={closeCreateModal}>
          {/* Importez et utilisez votre composant */}
            <Create_driver />
          </MaModalCreate>
      </TouchableOpacity>



    </View>

    <Text>Total des chauffeurs : {drivers.length} </Text>

      <FlatList
        data={filtredDriver}
        keyExtractor={(driver) => driver.DriverId}
        renderItem={renderDriverItem}
      />


      <MaModalUpdateDelete visible={modalUpdateDelete} closeUpdateModal={closeUpdateDeleteModal}>
        <Show_info_driver driver={selectedDriverId ? drivers.find(driver => driver.DriverId === selectedDriverId) : null} />
        {/* selectedDriverId ? drivers.find(driver => driver.DriverId === selectedDriverId) : null */}
      </MaModalUpdateDelete>

    </View>
  );
};


  /*==========================================CSS=============================================== */


const styles = StyleSheet.create({
  container: {

    flex: 1,
    padding: 16,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  driverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth:1,
    //borderWDriverIdth: 20,
    borderColor: 'black',
    backgroundColor: '#f0f0f0',
  },
  driverName: {
    fontSize: 16,
  },
  button: {
    /*backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,*/

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: 80,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1,
    color:'black',
    height:40,
    textAlign:'center',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:3,

  },
  createButton: {

    //marginLeft:'95%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 20,
    width: 45,
  },

  containerTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

});

export default DriversListPage;
