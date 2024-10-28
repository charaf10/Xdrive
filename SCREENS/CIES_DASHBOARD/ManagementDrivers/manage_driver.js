// DriversListPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Table } from 'antd';
import axios, { all } from 'axios';
import {myip, mydbAPI} from '../../../IP';
import MaModalCreate  from '../../../Component/Modal/modalCreate';
import MaModalUpdateDelete  from '../../../Component/Modal/modalUpdateDelete';
import Create_driver from '../../../Component/Screen/admin/create_driver'; // Assurez-vous d'importer votre composant correctement
import WorkerDetailScreen from '../../../SCREENS/Schedule/SCH_composant/driver/WorkerDetailScreen'; // Assurez-vous d'importer votre composant correctement
import ListWorkers from '../../../SCREENS/Schedule/worker/ListWorkers'; // Assurez-vous d'importer votre composant correctement
import Show_info_driver from '../../../Component/Screen/admin/show_info_driver'; // Assurez-vous d'importer votre composant correctement
import SearchBar from "../../../Component/SearchBar/searchBar";
import { useNavigation } from '@react-navigation/native';
import ActifDrivers from '../../CIES_DASHBOARD/Manage/ActifDrivers'

const DriversListPage = ({ route}) => {

  const { param1, param2 } = route.params; // Destructure the passed parameters
  const navigation = useNavigation();

  //const navigation = useNavigation();  // Access navigation here
  let identreprise = param2;

  console.log("identreprise_managementDrivers",identreprise);
  

  //console.log("je suius le manage_driver");

    /*=========================================VARIABLES=========================================== */

  const [selectedIdDriver, setSelectedIdDriver] = useState(null);


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
    setSelectedIdDriver(null);
  };


  /*======================================LES FONCTIONS============================================= */



    const fetchAllDrivers = async () => {
      //console.log("je suis la page manage_driver ");
      try {
        const response = await axios.post('http://' + myip + ':80/link/entreprise/get_myActifDrivers.php', {id: identreprise});
        setDrivers(response.data);
        setFiltredDriver(response.data)

        console.log("dd: " + drivers);
        
      } catch (error) {
        //console.error('Erreur lors de la récupération des pilotes :', error);
      }  
      //console.log("driver2 : " + drivers.length);
    };   
  

    /*
    useEffect(() => {
    axios.post('http://' + myip +':80/link/entreprise/get_myDrivers.php', {id: identreprise})
    .then(response => {
        //setData(response.data);

        const transformedData = response.data.map(item => ({
          IdLinked: item.IdLinked,
          IdDriver: item.IdDriver,
          FirstName: item.FirstName,
          LastName: item.LastName,
          }));
        //setData(transformedData);
        setDrivers(response.data);

        console.log(transformedData);
        
      })
      .catch(error => {
        console.error(error);
      });
}, []);

*/

/*

        const handleSelect = (driver) => {
          const newSelectedIdDriver = driver.IdDriver === selectedIdDriver ? null : driver.IdDriver;
          setSelectedIdDriver(newSelectedIdDriver);
          openUpdateDeleteModal();
          console.log("IdDriver " + driver.IdDriver);
          console.log("Selected driver dans (handleSelect) " + newSelectedIdDriver);
        };


        const handleSelect = (driver) => {
          const newSelectedIdDriver = driver.IdDriver === selectedIdDriver ? null : driver.IdDriver;
          setSelectedIdDriver(newSelectedIdDriver);
        
          if (newSelectedIdDriver) {
            openUpdateDeleteModal();
          } else {seUpdateDelet
            cloeModal();
          }

          console.log("IdDriver " + driver.IdDriver);
          console.log("Selected driver dans (handleSelect) " + newSelectedIdDriver);
        };
        
*/
        


    const handleSelect = (driver) => {
      //setSelectedDriver(driver.IdDriver === selectedDriver ? null : driver.IdDriver);
      console.log("IdDriver " + driver.IdDriver);

      const newSelectedIdDriver = driver.IdDriver === selectedIdDriver ? null : driver.IdDriver;
      setSelectedIdDriver(newSelectedIdDriver);
      setSelectedDriver(driver.IdDriver);
    
      if (newSelectedIdDriver) 
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
      //item.FirstName.includes(searchText)  || item.LastName.includes(searchText));
      item.FirstName.toLowerCase().includes(searchText.toLowerCase()) || 
      item.LastName.toLowerCase().includes(searchText.toLowerCase()));
     setFiltredDriver(filtred);
     
    } 
    else{

      //console.log("dans le else  : "+searchText);
      fetchAllDrivers();
      
      setFiltredDriver(drivers);


    }     
  };

  /*=========================================USE EFFECT=========================================== */

//iciiii
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
              style={[styles.driverItem, { borderColor: item.IdDriver === selectedDriver ? 'red' : 'black' }]}
              onPress={() => handleSelect(item)}>
              <Text style={styles.driverName}>{item.Firstname + " "}</Text>
              <Text style={styles.driverName}>{item.Lastname}</Text>
            </TouchableOpacity>


    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('WorkerDetailScreen', { workerId: item.IdDriver })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <Text style={styles.workerName}>{item.Firstname + " "}</Text>
      <Text style={styles.workerName}>{item.Lastname + " "}</Text>
      <Text style={styles.workerName}>{item.Email}</Text>
    </TouchableOpacity>

*/}

          </View>



{/*
          <MaModalMoreInfoDriver visible={modalMoreInfoVisible} closeUpdateModal={() => {closeMoreInfoModal(); setSelectedIdDriver(null);}}>
            <Show_info_driver driver={item} />
          </MaModalMoreInfoDriver>



          <MaModalMoreInfoDriver visible={modalMoreInfoVisible} closeUpdateModal={closeMoreInfoModal}>
            <Show_info_driver driver={selectedIdDriver ? drivers.find(driver => driver.IdDriver === selectedIdDriver) : null} />
          </MaModalMoreInfoDriver>
*/}

        </View>
      );



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

    <Text>Total des chauffeurs : {filtredDriver ? filtredDriver.length : drivers.length}</Text>
    {


}

<br/>
<h1>Actifs Drivers</h1>
    <Table
            dataSource={filtredDriver}
            columns={columns}
            rowKey="id"
            pagination={false}  // Disable pagination here
            scroll={{ y: 400 }}  // Enable scrolling for large lists
        />

<br/>
<h1>My all Drivers</h1>
<ActifDrivers />

{/*
      <FlatList
        data={filtredDriver}
        keyExtractor={(driver) => driver.IdDriver}
        renderItem={renderDriverItem}
      />
*/}



      <MaModalUpdateDelete visible={modalUpdateDelete} closeUpdateModal={closeUpdateDeleteModal}>
        <Show_info_driver driver={selectedIdDriver ? drivers.find(driver => driver.IdDriver === selectedIdDriver) : null} />
        {/* selectedIdDriver ? drivers.find(driver => driver.IdDriver === selectedIdDriver) : null */}

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
    //borderWIdDriverth: 20,
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
