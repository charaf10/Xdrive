import React from 'react';
import { useState, useEffect } from 'react';
import {
Modal,FlatList,SafeAreaView,StatusBar,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

/*Outils */
import axios from 'axios';
import myip from '../../../IP'

import { fetchListProfil } from '../../../Lakay_function/RefreshListProfil';


  



  export default function Profil({route, navigation }) {


    const { id, username, password } = route.params;
    //const { id } = {id :28};
    const [data, setData] = useState([]);

    const [vehicule, setVehicule] = useState([]);
    const [shift, setShift] = useState([]);
    const [location, setLocation] = useState([]);

    

    /*================================REFRESH DATA==================================================== */

/* REFRESH DATA EVRY 2sec */
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData(id);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const refreshData = id => {
    fetchListProfil(id)
      .then(response => {
        const transformedData = response.data.map(item => ({
          id: item.id,
          idDriver: item.idDriver,
          nameVehicule: item.nameVehicule,
          nameShiftType: item.nameShiftType,
          location: item.location
        }));
        setData(transformedData);

      })
      .catch(error => {
        console.error(error);
      });
  };

    /*================================REFRESH DATA==================================================== */




    const Item = ({item, onPress, backgroundColor, textColor, backStatus}) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
          <Text>
            <Text style={[styles.id, {color: textColor}]}>{item.id}</Text>
            <Text><br/></Text>
            <Text style={[styles.title, {color: textColor}]}>{item.idDriver}</Text>      
            <Text><br/></Text>
            <Text style={[styles.status, {color: textColor}]}>{item.nameVehicule}</Text>
            <Text><br/></Text>
            <Text style={[styles.status, {color: textColor}]}>{item.nameShiftType}</Text>
          </Text>
        </TouchableOpacity>
      );








/* ===================================ItemNew=================================================== */
    const ItemNew = ({onPress, backgroundColor}) => (
        <TouchableOpacity onPress={onPress} style={[styles.itemNew, {backgroundColor}]}>
          <Text style={{fontSize:30, marginTop:-5}}>+</Text>
        </TouchableOpacity>
      );

/* ===================================ItemNew=================================================== */



        useEffect(() => {
            // Récupérer les données de votre base de données
            axios.post('http://' + myip +':80/link/driver/SelectListProfil.php', {id:id})
              .then(response => {
        
                const transformedData = response.data.map(item => ({
                  id: item.id,
                  nameVehicule: item.nameVehicule,
                  nameShiftType: item.nameShiftType,
                  location: item.location,
                  }));
                setData(transformedData);
                console.log(transformedData);
              })
              .catch(error => {
                console.error(error);
              });
          }, []);
         


        const [selectedId, setSelectedId] = useState();

const renderItem = ({item}) => {
  const backgroundColor = item.id === selectedId ? '#4C74D6' : '#F0BA79';
  const color = item.id === selectedId ? 'white' : 'black';
  const border = item.id === selectedId ? 'orange' : 'black';
  /* a tester pour on/off */
  //const statu = item.id === selectedId ? 'orange' : 'black';



const handlePress = () => {



  navigation.navigate("Offer_list", {id: id, vehicule: item.nameVehicule, shift : item.nameShiftType, location : item.location});

}




  return (
    <View>
      <Item
        item={item}
        //onPress={() => [console.log("id: " + selectedId), setSelectedId(item.id)]}
        onPress={handlePress}
        backgroundColor={backgroundColor}
        textColor={color}
        border={border}
      />
      </View>
  ); 
};


const gotoCreate = () => {
    console.log("test btn goto " + id);
    navigation.navigate("Create_profil", {id: id});




    
  }

return (
    <SafeAreaView style={styles.container}>
      <Text>
        <Text style={{
          flex:1,
          color:'#91A4D3',
          justifyContent:'center',
          alignItems:'center'
          }}><h1>profil liste</h1>
          </Text>
      </Text>  


          <ItemNew onPress={gotoCreate} />


        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />

    </SafeAreaView>
  );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor:'#F2E6E6'
    },  
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      height:150,
      borderRadius:10,
      },
    itemNew: {
      backgroundColor:'#91A4D3',
      width:40,
      height:40,
      justifyContent:'center',
      alignContent:'center',
      textAlign:'center',
      borderRadius:50,
      marginLeft:335,
    },


    })
