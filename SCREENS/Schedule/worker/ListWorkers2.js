import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios, { all } from 'axios';
import myip from '../../../../IP';

const ListWorkers = () => {
  const navigation = useNavigation();


  const [filtredDriver, setFiltredDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);


  //console.log(drivers);

  
  useEffect(() => {

  const fetchAllDrivers = async () => {
    //console.log("je suis la page manage_driver ");
    try {
      const response = await axios.get('http://' + myip + ':80/api_schedule/get_alldrivers.php');
      setDrivers(response.data);
      setFiltredDriver(response.data)

     // console.log(drivers);

    } catch (error) { /*console.error('Erreur lors de la récupération des pilotes :', error); */ }  
    //console.log("driver2 : " + drivers.length);
  };   
    fetchAllDrivers();
      }, []);




  const renderDriverItem = ({ item }) => (

    <TouchableOpacity
        style={styles.itemContainer}
        /*onPress={() => navigation.navigate('WorkerDetailScreen', { worker: item })}*/
      >
        <Text style={styles.workerName}>{item.Firstname} {item.Lastname}</Text>
      </TouchableOpacity>
    );
  

    

      //console.log(filtredDriver);

  return (

    <View style={styles.container}>
      <FlatList
      data={filtredDriver}
      keyExtractor={(driver) => driver.DriverId}
      renderItem={renderDriverItem}
      />
    </View>

/*
      <Text>Nom : {drivers[0].Firstname}</Text>
      <Text>Âge : {drivers.Firstname}</Text>
      <Button
        title="Voir les détails"
        onPress={() => navigation.navigate('DetailsConducteur', { conducteur: drivers })}
      />
*/ 


  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workerName: {
    fontSize: 18,
  },
});
export default ListWorkers;
