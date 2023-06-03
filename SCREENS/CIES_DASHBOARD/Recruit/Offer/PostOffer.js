import React from 'react';
import { useState, useEffect } from 'react';
import {
          Modal,FlatList,SafeAreaView,StatusBar,StyleSheet,Text,TouchableOpacity,View,Pressable} from 'react-native';

/*Outils */
import axios from 'axios';
import myip from '../../../../IP';


import Create_btn from '../../../../COMPONENTS/COM_UTILS/BUTTON/Button_entreprise_offer/ButtonCreatePostOffer';

/* Composants */
import Long_press from '../../../../COMPONENTS/COM_VIEWS/CIES/Long_press_offer'
import Btn_post from '../../../../COMPONENTS/COM_UTILS/BUTTON/Button_entreprise_offer/Pressable_entreprise_offer'
import Btn_apply_notif from '../../../../COMPONENTS/COM_UTILS/BUTTON/Button_apply_notif'



import { fetchData } from '../../../../Lakay_function/Refresh';


 const ListDriver = ({route, navigation}) => {




  //const {identreprise} = route.params;
  const {identreprise} = {identreprise:58};
  const [data, setData] = useState([]);
  const [showModal, setShowmodal] = useState(false);
  const [nbNotif, setnbNotif] = useState();
  const separe = <br/>




    /*================================REFRESH DATA==================================================== */

/* REFRESH DATA EVRY 2sec */
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData(identreprise);


    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const refreshData = identreprise => {
    fetchData(identreprise  )
      .then(response => {
        const transformedData = response.data.map(item => ({
          id: item.id,
          title: item.title,
          typeVehicule: item.typeVehicule,
          typeShift: item.typeShift,
          location: item.location,
          status: item.status,
        }));
        setData(transformedData);
      })
      .catch(error => {
        console.error(error);
      });
  };

    /*================================REFRESH DATA==================================================== */





    
  const Item = ({item, onPress, backgroundColor, textColor, backStatus, notif , onpress2}) => (

    
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text>
        <Text style={[styles.id, {color: textColor}]}>{item.id}</Text>
          <Text> </Text>
        <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>      
          <Text>{separe}{separe} </Text>
        <Text style={[styles.typeVehicule]}>{item.typeVehicule}</Text>
          <Text>{separe}{separe} </Text>
        <Text style={[styles.typeShift]}>{item.typeShift}</Text>
          <Text>{separe}{separe} </Text>
        <Text style={[styles.status, {backgroundColor: backStatus}]}>{item.status}</Text>
        <Btn_apply_notif  title={notif} onPress={onpress2}/>
        <Text></Text>
      </Text>
    </TouchableOpacity>
  );
  
//

  const ItemNew = ({onPress, backgroundColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.itemNew, {backgroundColor}]}>
      <Text style={{fontSize:30, marginTop:-5}}>+</Text>
    </TouchableOpacity>
  );
  



          /*================================NOTIFICATION APPLY==================================================== */
      
          useEffect(() => {

          
            axios.post('http://' + myip +':80/link/entreprise/SelectCountApply.php', {idOffer : selectedId})
              .then(response => {
      
        
                setnbNotif(response);
                  console.log("response.data = " + nbNotif);
              
              })
              .catch(error => {
                console.error(error);
              });
          
            }, []);
 
          
           
          /*================================NOTIFICATION APPLY==================================================== */
          


  useEffect(() => {
    // Récupérer les données de votre base de données
    axios.post('http://' + myip +':80/link/entreprise/SelectListOffer.php', {id_utilisateur : identreprise})
      .then(response => {
        //setData(response.data);

        const transformedData = response.data.map(item => ({
          id: item.id,
          title: item.title,
          typeVehicule: item.typeVehicule,
          typeShift: item.typeShift,
          location: item.location,
          status: item.status,
          }));
        setData(transformedData);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  const [selectedId, setSelectedId] = useState();
  const [selectedStatus, setSelectedStatus] = useState(false);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#4C74D6' : '#F0BA79';
    const color = item.id === selectedId ? 'white' : 'black';
    const border = item.id === selectedId ? 'white' : 'black';
    const on_off = item.status === "on" ? 'green' : 'red';
    /* a tester pour on/off */
    //const statu = item.id === selectedId ? 'orange' : 'black';



  
  
  const handlePress = () => {
      setSelectedId(item.id)
      setShowmodal(true)

  }
  const handleCloseModal = () => {
    setShowmodal(false)

    /* pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) */
    setSelectedId(0)
  }



  /*================================PUBLISH OFFER==================================================== */



  const handlePublish = () => {

      axios.post('http://' + myip +':80/link/entreprise/PublishOffer.php', {Id : selectedId})
        .then(response => {
          alert("L'offre a été publié avec success")
          setShowmodal(false)
          /* pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) */
          setSelectedId(0)
        })
        .catch(error => {
          console.error(error);
        });
  }
  /*================================PUBLISH OFFER==================================================== */


  /*================================Delete DATA==================================================== */


  const handleDelete = () => {
    console.log("Delete");

    axios.post('http://' + myip +':80/link/entreprise/DeleteOffer.php', {Id : selectedId})
    .then(response => {
      alert("L'offre a été supprimer ")
      setShowmodal(false)

    })
    .catch(error => {
      console.error(error);
    });
  }

  /*================================Delete DATA==================================================== */



  /*================================ SHOW Apply OFFER==================================================== */

  const handleShowApply = () => {

 
        setShowmodal(false)
        setSelectedId(item.id)
        console.log("seletedId: " + selectedId);
        navigation.navigate("ListApply", {id: selectedId});
        setSelectedId(0)


}
/*================================SHOW APLLY OFFER==================================================== */


    return (
      <View>
        <Item
          item={item}
          //onPress={() => [console.log("id: " + selectedId), setSelectedId(item.id)]}
          onPress={handlePress}
          onpress2={handleShowApply}
          textColor={color}
          backgroundColor={backgroundColor}
          borderColor={border}
          notif={0}
          backStatus={on_off}
        />



        
        <Modal
        transparent={true}
          visible={showModal}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
              <Text>Item  {selectedId}</Text>
              <Text>

              <Btn_post title={"Apply"} onPress={handleShowApply}/>
              <Btn_post title={"Publish"} onPress={handlePublish}/>              
              <Btn_post title={"Delete"} onPress={handleDelete}/>

              </Text>            
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        </View>
    ); 
  };


  const gotoCreate = () => {
    console.log(identreprise);
    navigation.navigate("CreateOffer", {identreprise: identreprise});
  
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        <Text style={{
          flex:1,
          color:'#91A4D3',
          justifyContent:'center',
          alignItems:'center'
          }}><h1>My offers</h1>
          
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
         
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#F2E6E6',
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height:150,
    borderRadius:10,
  },
  title: {
    fontSize: 15,
  },
  id: {
    
    fontSize: 20,
    marginRight:100,
    //backgroundColor: 'black',
    borderRadius:50,
  },
  status: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    //fontSize:20,
    borderRadius:50,
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
  },
  typeVehicule: {
    marginLeft:'40%',
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
  },
  typeShift: {
    marginLeft:'40%',
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
  },
  notif: {

    position: 'absolute',
    top: 35,
    right: 0,
    width: 30,
    height: 30,
    //fontSize:20,
    borderRadius:50,
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
    backgroundColor:'white',
  },

  modalContainer: {
    position: 'absolute',
    top: 340,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#91A4D3',
    Color:'blue',
    width: '80%',
    height: '20%',
    marginLeft:'10%',
    borderRadius:15,
  },
});

export default ListDriver;

