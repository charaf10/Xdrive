// CyclesListPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { configureAPI } from '../../../IP';

import MaModalCreate  from '../../../Component/Modal/modalCreate';
import MaModalUpdateDelete  from '../../../Component/Modal/modalUpdateDelete';

import Create_Cycle from '../../../Component/Screen/admin/create_cycle'; // Assurez-vous d'importer votre composant correctement

import Show_info_Cycle from '../../../Component/Screen/admin/show_info_cycle'; // Assurez-vous d'importer votre composant correctement
import SearchBar from "../../../Component/SearchBar/searchBar";


const CyclesListPage = ({navigation, route}) => {



  //const {id} = route.params;
  //let identreprise = id

  const  identreprise = 58;

    /*=========================================VARIABLES=========================================== */

  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [filtredCycle, setFiltredCycle] = useState(null);
  const [Cycles, setCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [modalCreateVisible, setmodalCreateVisible] = useState(false);
  const [modalUpdateDelete, setmodalUpdateDelete] = useState(false);
  const [compo, setCompo] = useState('');


    /*================================ACTIVATE/DESACTIVATE MODAL================================= */

  const openCreateModal = () => {
    
    setSelectedCycle(null);
    setmodalCreateVisible(true);
    setCompo('create');

  };

  const closeCreateModal = () => {
    console.log("clicker");
    setmodalCreateVisible(false);
    fetchAllCycles(identreprise);
  };

  const openUpdateDeleteModal = () => {
    setmodalUpdateDelete(true);
    //console.log("selected Cycle dans (openMoreInfoModal)" + selectedCycle);

  };

  const closeUpdateDeleteModal = async() => {
    setmodalUpdateDelete(false);
    fetchAllCycles(identreprise);
    setSelectedTemplateId(null);
  };


  const refresh = async() => {
    fetchAllCycles(identreprise);
    setSelectedCycle(null);
    setSelectedTemplateId(null);

    //console.log("TemplateId dans refresh " + Cycle.TemplateId);

  };

  /*======================================LES FONCTIONS============================================= */



    const fetchAllCycles = async (identreprise) => {


try{
      const api = await configureAPI(identreprise);
      const response = await api.post('get_allCycles.php');
      setCycles(response.data);
      setFiltredCycle(response.data)
      console.log('Données de la réponse :', response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cycles :', error);
    }
    };   
    
    

    const handleSelect = (Cycle) => {

      //setSelectedCycle(Cycle.TemplateId === selectedCycle ? null : Cycle.TemplateId);
      console.log("TemplateId " + Cycle.TemplateId);

      setCompo('');
      refresh();

      const newSelectedTemplateId = Cycle.TemplateId === selectedTemplateId ? null : Cycle.TemplateId;
      //setSelectedTemplateId(newSelectedTemplateId);
      setSelectedTemplateId(Cycle.TemplateId);
      setSelectedCycle(Cycle.TemplateId);
    
      if (newSelectedTemplateId) 
      {
             openUpdateDeleteModal();
             console.log("hello");

      } 
      else 
      {


        setmodalUpdateDelete(false);
      }
      console.log("selected Cycle dans (handleSelect)" + selectedCycle);
    };


  const handeSearch = (searchText) => {
    if (searchText) {
      const filtred = Cycles.filter(item =>  
      item.Name.includes(searchText)  || item.Color.includes(searchText));
     setFiltredCycle(filtred);
    } 
    else{
      //console.log("dans le else  : "+searchText);
      fetchAllCycles(identreprise);
    }     
  };

  /*=========================================USE EFFECT=========================================== */


  useEffect(() => {
    fetchAllCycles(identreprise);
    refresh();
     /*  
    const interval = setInterval(() => {
      console.log("test");
      fetchAllCycles();
      refresh();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
*/
      }, []);

 
      const renderCycleItem = ({ item }) => (
        <View style={styles.cardContainer}>   
          <View style={{backgroundColor:item.Color}}>           
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7} // Ajustez l'opacité active selon vos préférences
                >
                  <Text style={styles.cardTitle}>{item.Name}</Text>
                </TouchableOpacity>    
          </View>
        </View>
     );




{/*  code actuel


        <View>
          <View>

            <TouchableOpacity
              style={[styles.CycleItem, { borderColor: item.TemplateId === selectedCycle ? 'red' : 'black' }]}
              onPress={() => handleSelect(item)}>
              <Text style={styles.CycleName}>{item.Name + " "}</Text>
              <Text style={styles.CycleName}>{item.Color}</Text>
            </TouchableOpacity>

          </View>
        </View>
*/}

  
  return (
    <View style={styles.container}>


    <View style={styles.containerTouchable}>
      <SearchBar onUpdate={handeSearch}/>
      <Text style={styles.titre} >Cycle management</Text>
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
          <Text style={{color: "white"}}>create cycle</Text>
             <MaModalCreate visible={modalCreateVisible} closeCreateModal={closeCreateModal}>
            <Create_Cycle />
          </MaModalCreate>           
      </TouchableOpacity>
    </View>

       <Text>Total des cycles : {filtredCycle ? filtredCycle.length : Cycles.length} </Text> 

    <View style={styles.container2}>
        <FlatList
          horizontal
          data={filtredCycle}
          keyExtractor={(Cycle) => Cycle.TemplateId}
          renderItem={renderCycleItem}
        />
    </View>

{/*
      <View style={styles.containerRight}>
        {compo ? <Create_Cycle />
               : <Show_info_Cycle Cycle={ selectedTemplateId ? Cycles.find(Cycle => Cycle.TemplateId === selectedTemplateId) : null} />
        }              
      </View>
*/}

      <MaModalUpdateDelete visible={modalUpdateDelete} closeUpdateModal={closeUpdateDeleteModal}>
        <Show_info_Cycle Cycle={ selectedTemplateId ? Cycles.find(Cycle => Cycle.TemplateId === selectedTemplateId) : null} />
        {/* selectedTemplateId ? Cycles.find(Cycle => Cycle.TemplateId === selectedTemplateId) : null */}
       </MaModalUpdateDelete>  

    </View>
  );
};


  /*==========================================CSS=============================================== */


const styles = StyleSheet.create({

/* ========================================================================================= */

/*


  article:{
    //display: 'inline-block',
    flexDirection:'row',
    color:'silver',
    width: '100%',
    height: 'auto',
  
  },
  */


  cardContainer: {
    //flex: 1, // Cela alignera les cartes horizontalement
    justifyContent: 'space-between', // Vous pouvez ajuster cette propriété pour contrôler l'espacement entre les cartes
    margin: 10,
    //width:'25%',
    //width : '25%',
    backgroundColor:'transparent',
  },


  
  card: {
    flexDirection:'row', // Cela permet à chaque carte de prendre autant d'espace que possible
    //width:'10%',
    margin: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 10,
    //maxWidth: 300,
    textAlign: 'center',
    // backgroundColor: 'grey',
  },
  cardTitle: {
    margin: 0,
    fontSize: 24, // Ajustez la taille de la police selon vos préférences
    fontWeight: 'bold',
    color: '#000000', // Couleur par défaut du texte
  },
  cardText: {
    margin: 0,
    fontSize: 20, // Ajustez la taille de la police selon vos préférences
    color: '#333333', // Couleur par défaut du texte
  },
  cardHover: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },


/* ========================================================================================= */


  container2: {
    //flexDirection: 'row',
    justifyContent: 'space-between', // Vous pouvez ajuster cela selon vos besoins
    paddingHorizontal: 10, // Ajoutez un espacement horizontal global si nécessaire
    paddingVertical: 10, // Ajoutez un espacement vertical global si nécessaire
  },
  containerLeft: {
    //flex: 1, // Cela permet à la vue de gauche de prendre autant d'espace que possible
    marginRight: 10, // Ajoutez un espacement à droite si nécessaire
  },



/* ========================================================================================= */

  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#C6F7A5',
    height:'100%',
  },

  CycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth:1,
    //borderWTemplateIdth: 20,
    borderColor: 'black',
    backgroundColor: '#f0f0f0',
  },

  CycleName: {
    fontSize: 16,
  },

  titre:{
    marginRight: '20%',
    fontSize:30,
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
    //width: 45,
  },

  containerTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

});

export default CyclesListPage;