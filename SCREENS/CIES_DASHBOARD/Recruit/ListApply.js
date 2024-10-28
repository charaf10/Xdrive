import { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';
import {myip, mydbAPI} from '../../../IP'





const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text>
      <Text style={[styles.id, {color: textColor}]}>{item.id}</Text>
      <Text> </Text>

      <Text style={[styles.id, {color: textColor}]}>{item.idDriver}</Text>
      <Text> </Text>

      <Text style={[styles.id, {color: textColor}]}>{item.status}</Text>
      <Text> </Text>
    </Text>
  </TouchableOpacity>
);

const ListApply = ({route, navigation}) => {

  const { id } = route.params;

  console.log("id apply: " + route);
  

  //const { param1, param2 } = route.params; // Destructure the passed parameters
  //let id = param2;


  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState();

  
    //    axios.post('http://' + myip +':80/link/entreprise/SelectListApply.php', {idOffer : selectedId})
useEffect(() => {

  setSelectedId(id)

  // Récupérer les données de votre base de données
  console.log("selectedID: " + id);
  axios.post('http://' + myip +':80/link/entreprise/SelectListApply.php', {id: id})
    .then(response => {
        //setData(response.data);

        const transformedData = response.data.map(item => ({
          id: item.id,
          idDriver: item.idDriver,
          status: item.status,
          }));
        setData(transformedData);
      })
      .catch(error => {
        console.error(error);
      });
}, []);


const ShowFiche = (item) =>{

  console.log("item id: " + id);
  setSelectedId(id)

  navigation.navigate("show_info_driver", {worker: item});

}





const renderItem = ({item}) => {
  const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
  const color = item.id === selectedId ? 'white' : 'black';

  return (
    <View>
    <Item
      item={item}
      onPress={() => ShowFiche(item)}
      backgroundColor={backgroundColor}
      textColor={color}
    />
    
    </View>
  );
};

  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },  
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  id: {
    
    fontSize: 20,
    marginRight:100,
    //backgroundColor: 'grey',
    borderRadius:50
  },
});

export default ListApply;