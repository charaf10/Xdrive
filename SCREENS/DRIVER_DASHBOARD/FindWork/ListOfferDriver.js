import React from 'react';
import { useState, useEffect } from 'react';
import {
Modal,FlatList,SafeAreaView,StatusBar,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

/*Outils */
import axios from 'axios';
import myip from '../../../IP'

/* Composants */
import Long_press from '../../../COMPONENTS/COM_VIEWS/CIES/Long_press_offer'
import Btn_post from '../../../COMPONENTS/COM_UTILS/BUTTON/Button_entreprise_offer/Pressable_entreprise_offer'



const Item = ({item, onPress, backgroundColor, textColor, backStatus}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text>
      <Text style={[styles.id, {color: textColor}]}>{item.id}</Text>
      <Text> </Text>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>      
      <Text> </Text>
      <Text style={[styles.status, {color: textColor}]}>{item.status}</Text>
    </Text>
  </TouchableOpacity>
);

 const ListOffer = ({route}) => {

  const { id, username, password, vehicule, shift, location } = route.params;
  //const {identreprise} = {identreprise:16};
  const [data, setData] = useState([]);
  const [showModal, setShowmodal] = useState(false);

  const [statusApply, setstatusApply] = useState("stand");

  console.log("id: " + id);
  console.log("vehicule: " + vehicule);
  console.log("shift: " + shift);
  console.log("location : " + location);

  useEffect(() => {
    // Récupérer les données de votre base de données
    axios.post('http://' + myip +':80/link/driver/SelectListOffer.php', {id : id, vehicule: vehicule, shift : shift, location : location})
      .then(response => {
        //setData(response.data);

        const transformedData = response.data.map(item => ({
          id: item.id,
          vehicule: item.typeVehicule,
          shift: item.typeShift,
          location: item.location,
          }));
        setData(transformedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'black' : 'orange';
    const color = item.id === selectedId ? 'white' : 'black';
    const border = item.id === selectedId ? 'orange' : 'black';
    /* a tester pour on/off */
    //const statu = item.id === selectedId ? 'orange' : 'black';
  
  
  const handlePress = () => {
      setSelectedId(item.id)
      setShowmodal(true)
  }
  const handleCloseModal = () => {
    setShowmodal(false)
    setSelectedId(0)
  }




  /* ==========================================Apply Zone=========================================== */


  const handleApplyClick = () => {

    const shouldExecute = window.confirm("Êtes-vous sûr de vouloir appliquer à cette offre ?");
  
    if (shouldExecute) {
      // Exécuter la requête Axios


      
    axios.post('http://' + myip +':80/link/driver/InsertApply.php', {
     
     IdDriver: id,
     IdOffer: selectedId,
     Status: statusApply,

    })

    .then((response) => {
      console.log(response);

      console.log("id : " + id);
      console.log("selected id : " + selectedId);
      console.log("statusApply : " + statusApply);
        
        alert("Insert Success");
    })
    
    .catch((error) => {
      console.error(error);
      alert("Echec Request"); 
    });  
} 
  };

    /* ==========================================Saved Zone=========================================== */


    const handleSavedClick = () => {

      const shouldExecute = window.confirm("Êtes-vous sûr de vouloir sauvegarder cette offre ?");
    
      if (shouldExecute) {
        // Exécuter la requête Axios
  
  
      axios.post('http://' + myip +':80/link/driver/InsertSaved.php', {
       
       IdDriver: id,
       IdOffer: selectedId,
  
      })
  
      .then((response) => {
        console.log(response);
          alert("Insert Success");
      })
      
      .catch((error) => {
        console.error(error);
        alert("Echec Request"); 
      });  
  } 
    };
  
      /* ==========================================Saved Zone=========================================== */
  




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
        
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
              <Text>Item  {selectedId}</Text>
              <Text>
                <Btn_post title={"Apply"} onPress={handleApplyClick}/>
                <Btn_post title={"Save"} onPress={handleSavedClick}/>
              </Text>            
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        </View>
    ); 
  };

  return (
    <SafeAreaView style={styles.container}>

        <Text style={{
          flex:1,
          color:'orange',
          justifyContent:'center',
          alignItems:'center'
          }}><h1>Resultat de recherche</h1></Text>
          


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
    backgroundColor:'black'
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
  status: {
   /* position:'fixed',
    marginTop: 1,
    fontSize: 10,*/

    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    //backgroundColor: 'red',
  },

  modalContainer: {
    position: 'absolute',
    top: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    textColor:'blue',
    width: '100%',
    height: '30%',
  
  },
});

export default ListOffer;