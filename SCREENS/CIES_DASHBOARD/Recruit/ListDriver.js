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
import myip from '../../../IP'




const Testt =  ({item}) =>{

  const [data2, setData2] = useState([]);



//alert(item.firstname)

};

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text>
      <Text style={[styles.id, {color: textColor}]}>{item.id}</Text>
      <Text> </Text>
      <Text style={[styles.title, {color: textColor}]}>{item.firstname}</Text>
    </Text>
  </TouchableOpacity>
);

 const ListDriver = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
    // Récupérer les données de votre base de données
    axios.post('http://' + myip +':80/link/entreprise/SelectListDriver.php')
      .then(response => {
        //setData(response.data);

        const transformedData = response.data.map(item => ({
          id: item.id,
          firstname: item.firstname,
          lastname: item.lastname

          }));
        setData(transformedData);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);





  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <View>
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
      
      <Testt item = {item} />
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

export default ListDriver;