import { useState, useEffect } from 'react';
import {FlatList,SafeAreaView,StatusBar,StyleSheet,Text,TouchableOpacity,} from 'react-native';
import axios from 'axios';
import myip from '../IP'


const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
    // Récupérer les données de votre base de données
    axios.post('http://' + myip +':80/link/Test/Select.php')
      .then(response => {
        //setData(response.data);

        const transformedData = response.data.map(item => ({
          id: item.id,
          title: item.name
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
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
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
    fontSize: 32,
  },
});

export default App;