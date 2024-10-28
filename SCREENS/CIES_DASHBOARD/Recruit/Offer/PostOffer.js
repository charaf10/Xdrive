import { useNavigation } from '@react-navigation/native';
import MaModalCreate  from '../../../../Component/Modal/modalCreate';
import { notification } from 'antd';

import React from 'react';
import { useState, useEffect } from 'react';
import {Modal,FlatList,SafeAreaView,StatusBar,StyleSheet,Text,TouchableOpacity,View,Pressablem,Alert} from 'react-native';

/*Outils */
import axios from 'axios';
import {myip, mydbAPI} from '../../../../IP';

/* Composants */
import Long_press from '../../../../COMPONENTS/COM_VIEWS/CIES/Long_press_offer'
import Btn_post from '../../../../COMPONENTS/COM_UTILS/BUTTON/Button_entreprise_offer/Pressable_entreprise_offer'
import Btn_apply_notif from '../../../../COMPONENTS/COM_UTILS/BUTTON/Button_apply_notif'
import BackButton from '../../../../COMPONENTS/Button/Button_Back'; // Make sure to update the path based on your file structure

import CreateOffer from '../Offer/CreateOfferTest'
import ListApply from '../Apply/ApplyDetails'

import { fetchData } from '../../../../Lakay_function/Refresh';
import { fetchApply } from '../../../../Lakay_function/Refresh';


 const ListDriver = ({route}) => {


  //const { param1, param2 } = route.params; // Destructure the passed parameters

  const navigation = useNavigation();  // Access navigation here
  //let identreprise = param2;
  const  identreprise = 58;
  //let test = route.params.param2;

  
  const [nbApply, setNbApply] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowmodal] = useState(false);
  const [nbNotif, setnbNotif] = useState();
  const [modalCreateVisible, setmodalCreateVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [offers, setOffers] = React.useState([]); // État pour stocker les offres
  const [isPublished, setIsPublished] = useState(false); // Track publish state
  const [publishedOffers, setPublishedOffers] = useState({});

  const applyCount = 5; // Remplacez cela par votre logique pour récupérer le nombre d'applications



  // Simuler des données d'offres pour l'exemple
  React.useEffect(() => {



    const fetchOffers = async () => {
      // Récupération des offres ici
      // setOffers(données récupérées);
    };
    fetchOffers();
  }, []);


  const separe = <br/>

//console.log("ppp" , route.params);
//console.log("id post" , test);
console.log("id post2" , identreprise);


const handleLongPress = () => {
  setModalVisible(true);
};

const closeModal = () => {
  setModalVisible(false);
};


const openCreateModal = () => {
  setmodalCreateVisible(true);
};

const closeCreateModal = () => {
  console.log("clicker");
  setmodalCreateVisible(false);
  //fetchAllDrivers();
};


    /*================================REFRESH DATA==================================================== */

/* REFRESH DATA EVRY 2sec */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      refreshData(identreprise);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const refreshData = identreprise => {
    fetchData(identreprise)
      .then(response => {
        const transformedData = response.data.map(item => ({
          idOffer: item.idOffer,
          title: item.title,
          typeVehicule: item.vehicle_type,
          typeShift: item.typeShift,
          location: item.location,
          status: item.status,
          apply_count: item.apply_count,
        }));
        setData(transformedData);



      })
      .catch(error => {
        console.error(error);
      });
  };



    /*================================REFRESH DATA==================================================== */


        /*================================PUBLISH/REMOVE OFFER==================================================== */
        const handleSelectOffer = (id) => {
          setSelectedId(id); // Définir l'ID de l'offre sélectionnée
          setShowmodal(true); // Afficher le modal
        };

        
          // Dans le rendu de votre composant
          const handlePublish = (id) => {
            console.log("handlePublish a été appelé avec l'ID:", id);
          
            axios.post('http://' + myip +':80/link/entreprise/PublishOffer.php', {Id : id})
            .then(response => {
              //alert("L'offre a été publié avec success")
              notification.success({
                message: 'Changes Submitted',
                description: 'L\'offre a été publié avec success',
              });
              console.log("response: ", response);
              setIsPublished(true);
              refreshData(identreprise);
              //setShowmodal(false)
              // pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) 
              setSelectedId(0)
            })
            .catch(error => {
              console.error(error);
              });
          };

                // Dans le rendu de votre composant
                const handleRemove = (id) => {
                  console.log("handlePublish a été retiré avec l'ID:", id);
                 
                  axios.post('http://' + myip +':80/link/entreprise/RemoveOffer.php', {Id : id})
                  .then(response => {
                    //alert("L'offre a été publié avec success")
                    notification.success({
                      message: 'Changes Submitted',
                      description: 'L\'offre a été retiré avec success',
                    });
                    console.log("response: ", response);
                    setIsPublished(false);
                    refreshData(identreprise);
                      
                    //setShowmodal(false)
                    // pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) 
                    setSelectedId(0)
                  })
                  .catch(error => {
                    console.error(error);
                    });
                };
        

/*================================PUBLISH/REMOVE OFFER==================================================== */

/*================================Apply OFFER==================================================== */


const handleApply = (id) => {

  console.log("pressed");
    
  setSelectedId(id)
  setShowmodal(true)
  refreshData(identreprise);

}
/*================================Apply DATA==================================================== */

/*================================Delete DATA==================================================== */


const handleDelete = (id) => {

  console.log("Delete" +  id);

  axios.post('http://' + myip +':80/link/entreprise/DeleteOffer.php', {Id : id})
  .then(response => {
    notification.success({
      message: 'Changes Submitted',
      description: 'L\'offre a été supprimée avec success',
    });    setShowmodal(false);       refreshData(identreprise);

  })
  .catch(error => {
    console.error(error);
  });
}

/*================================Delete DATA==================================================== */



      const viewDrivers = (item) => {
        // Logique pour afficher la liste des drivers qui ont postulé pour cette offre
        // Cela peut être un appel API ou une navigation vers un autre écran
        console.log('Voir les drivers pour l\'offre ID:', item.idOffer);
        //navigation.navigate("ListApply", {id: selectedId});

        closeModal(); // Ferme le modal principal si nécessaire
      };
    
  const Item = ({item, onPress, backgroundColor, textColor, backStatus, notif , onpress2}) => (

<View  style={styles2.cardContainer}>
<TouchableOpacity onPress={onPress} style={[styles2.card]}>
  <View style={styles2.row}>
    <Text style={styles2.label}>Offer ID:</Text>
    <Text style={styles2.value}>{item.idOffer}</Text>
  </View>
  <View style={styles2.row}>
    <Text style={styles2.label}>Title:</Text>
    <Text style={styles2.value}>{item.title}</Text>
  </View>
  <View style={styles2.row}>
    <Text style={styles2.label}>Vehicle:</Text>
    <Text style={styles2.value}>{item.typeVehicule}</Text>
  </View>
  <View style={styles2.row}>
    <Text style={styles2.label}>Shift:</Text>
    <Text style={styles2.value}>{item.typeShift}</Text>
  </View>
  <View style={styles2.row}>
    <Text style={styles2.label}>Status:</Text>
    <Text style={[styles2.status, {backgroundColor: backStatus}]}>{item.status}</Text>
  </View>
  <View style={styles2.row}>
    <Text style={styles2.label}>Apply:</Text>
    <Text style={styles2.apply}>0</Text>
  </View>

  <View style={styles2.buttonContainer}>
          <TouchableOpacity style={styles2.button} onPress={() => handleApply(item.idOffer)}>
            <Text style={styles2.buttonText}>Apply {data.status}</Text>
            {item.apply_count > 0 && (
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{item.apply_count}</Text>
              </View>
            )}
          </TouchableOpacity>

 
        <TouchableOpacity style={styles2.button} onPress={() => {item.status === 'off' ? handlePublish(item.idOffer) : handleRemove(item.idOffer)}}>
          <Text style={styles2.buttonText}>{item.status === 'off' ? 'Publish' : 'Remove'} {item.id}</Text>
        </TouchableOpacity>
    


{/*
          {isPublished ? (
        <TouchableOpacity style={styles2.button} onPress={() => handleRemove(item.id)}>
          <Text style={styles2.buttonText}>{item.status === 'on' ? 'Remove' : 'Publish'} {item.id}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles2.button} onPress={() => handlePublish(item.id)}>
          <Text style={styles2.buttonText}>{item.status === 'off' ? 'Publish' : 'Remove'} {item.id}</Text>
        </TouchableOpacity>
      )}
*/}

          <TouchableOpacity style={styles2.button} onPress={() => handleDelete(item.idOffer)}>
            <Text style={styles2.buttonText}>Delete</Text>
          </TouchableOpacity>



                {/* Modal pour afficher la liste des drivers qui ont postulé */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles2.modalView}>
          <Text style={styles2.modalText}>Liste des Drivers pour l'Offre ID: {item.id}</Text>
          {/* Afficher la liste des drivers ici */}
          {/* Exemple : */}
          <Text>Driver 1</Text>
          <Text>Driver 2</Text>
          <Text>Driver 3</Text>
          <TouchableOpacity style={styles2.button} onPress={closeModal}>
            <Text style={styles2.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  </View>

</TouchableOpacity>
</View>
  );
  /*
  <View style={styles2.buttonContainer}>
    <Btn_apply_notif title={notif} onPress={onpress2}/>
  </View>
  */
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
      
                console.log("selectedId = " + selectedId);

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
        console.log("identreprise = " + identreprise);

        const transformedData = response.data.map(item => ({
          idOffer: item.idOffer,
          title: item.title,
          typeVehicule: item.vehicle_type,
          typeShift: item.typeShift,
          location: item.location,
          status: item.status,
          apply_count: item.apply_count,
          }));
        setData(transformedData);
        console.log("transformedData :" + transformedData);
        

      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  const [selectedStatus, setSelectedStatus] = useState(false);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? 'transparent' : 'transparent';
    const color = item.id === selectedId ? 'white' : 'black';
    const border = item.id === selectedId ? 'white' : 'black';
    const on_off = item.status === "on" ? 'green' : 'red';
    /* a tester pour on/off */
    //const statu = item.id === selectedId ? 'orange' : 'black';



  
  
  const handlePress = () => {

    console.log("pressed");
    
      setSelectedId(item.idOffer)
      console.log("selectedId::: " + item.idOffer);
      
      //setShowmodal(true)

  }
  const handleCloseModal = () => {
    setShowmodal(false)
    refreshData(identreprise)

    /* pour que les items redevient a la couleur jaune (sinon ca reste backgroundcolor noir ) */
    setSelectedId(0)
  }

  const closeModal = () => {
    setIsModalVisible(false); // Assuming you're using a state variable to control the modal visibility
};



  /*================================ SHOW Apply OFFER==================================================== */

  const handleShowApply = () => {

 
        setShowmodal(true)
        setSelectedId(item.id)
        console.log("seletedId: " + selectedId);
        //navigation.navigate("ListApply", {id: selectedId});
        setSelectedId(0)


}
/*================================SHOW APLLY OFFER==================================================== */


    return (
      <View>
        <Item
          item={item}
          //onPress={() => [console.log("id: " + selectedId), setSelectedId(item.id)]}
          onPress={handlePress}
          onpress2={handlePress}
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

        <View style={styles.modalBackground}>


            <View style={styles.modalContainer}>

              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <Text>Item  {selectedId}</Text>
              <View style={styles.listContainer}>
                <ListApply id={selectedId} route={route}/>
              </View>            

          </View>
        </View>
        </Modal>



        </View>
    ); 
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text>
        <Text style={{
          flex:1,
          color:'#91A4D3',
          justifyContent:'center',
          alignItems:'center'
          }}><h1>My Posts</h1>
          
          </Text>
      </Text>  


    <View style={styles.containerTouchable}>
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
          <Text style={{color: "black"}}>New offer</Text>
          <MaModalCreate visible={modalCreateVisible} closeCreateModal={closeCreateModal}>
          {/* Importez et utilisez votre composant */}
            <CreateOffer Identreprise={identreprise}  closeCreateModal={closeCreateModal} />
          </MaModalCreate>
      </TouchableOpacity>
    </View> 
     
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.idOffer}
          extraData={selectedId}
        />

    </SafeAreaView>
  );
         
};


/* */
const styles2 = StyleSheet.create({

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // This allows the cards to wrap to the next line if there are too many
    justifyContent: 'space-between', // Add space between the cards
    marginHorizontal: 10,
    //backgroundColor:'blue',
  },

  card: {
    marginLeft:'25%',
    width:'50%',
    //flexBasis: '70%', // Each card takes up 48% of the row's width
    padding: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    //backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
    //marginVertical: 10,
    //marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
  },
  apply: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ddbd6e',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },

});

/* */
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'tranparent',

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
  
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent background
    //width:'70%',
  },


  modalContainer: {
    //flex: 1,
    padding: 15,
    //width: '80%', // Occupies full width of the modal
    position: 'absolute',
    top: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#63901f',
    Color:'blue',
    //width: '50%',
    //height: '40%',
    //marginLeft:'22.5%',
    //marginTop:'18%',
    marginTop:'20%',
    borderRadius:15,
  },
  closeButton: {
    position: 'absolute', // Absolute positioning to place it at the top right
    top: 10, // Adjust the distance from the top
    right: 10, // Adjust the distance from the right
    zIndex: 1, // Make sure it is on top of other elements
  },
  closeButtonText: {
    fontSize: 24, // Make the "X" larger
    fontWeight: 'bold', // Bold for visibility
    color: '#000', // You can change this to any color you prefer
  },
  listContainer: {
    flex: 1, // Allows ListApply to take up available space
    width: '100%', // Occupies full width of the modal
    backgroundColor: 'transparent', // Optional: background for ListApply area
    padding: 1,
    borderRadius:15,

  }
,

  modalContainerCreate: {
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#91A4D3',
    Color:'blue',
    width: '80%',
    //height: '80%',
    marginLeft:'10%',
    borderRadius:15,
  },

  containerTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  bubble: {
    position: 'absolute',
    right: -10, // Ajustez la position horizontale de la bulle
    top: -10, // Ajustez la position verticale de la bulle
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ListDriver;

