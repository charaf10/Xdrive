import { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import myip from '../IP'


export default function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Récupérer les données de votre base de données
    axios.post('http://' + myip +':80/link/Test/Select.php')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);




  const vuu1 =     <View>
                        <FlatList
                        data={data}
                        renderItem={({ item }) => (
                        <Text>{item.name}</Text>
                        )}
                        keyExtractor={item => item.id.toString()}
                      />
                      <br/>
                    </View>


  const vuu2 =      <View>
                      {data.map(item => (
                        <Text key={item.id}>{item.name}</Text>
                      ))}
                    </View>


  return ([vuu1,vuu2]);
}
