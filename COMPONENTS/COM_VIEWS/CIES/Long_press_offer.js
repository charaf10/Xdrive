import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, StatusBar } from 'react-native';

import PostOffer from '../../../SCREENS/CIES_DASHBOARD/Recruit/Offer/PostOffer'

import axios from 'axios';
import myip from '../../../IP'

import Btn_post from '../../COM_UTILS/BUTTON/Button_entreprise_offer/Pressable_entreprise_offer'

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false, // État de la fenêtre modale
    };
  }




  handleLongPress = () => {
    // Afficher la fenêtre modale lors de l'appui long
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    // Fermer la fenêtre modale lorsque l'utilisateur le souhaite
    this.setState({ showModal: false });
  }

  render() {


    return (
      <View style={styles.container}>



        
        <TouchableOpacity onLongPress={this.handleLongPress}>
          <View style={styles.button}>
            <Text>
              <Text>
                <Text>{1}</Text>
                <Text> </Text>
                <Text>{2}</Text>
              </Text>
            </Text>
          </View>
        </TouchableOpacity>

        {/* Fenêtre modale */}
        <Modal
          visible={this.state.showModal}
          animationType="slide"
          onRequestClose={this.handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <Text>Contenu de la fenêtre modale</Text>
            {/* Autres composants et contenu de la fenêtre modale */
            <Text>
              <Btn_post title={"Publish"}/>
              <Btn_post title={"Update"}/>
              <Btn_post title={"Delete"}/>
            </Text>
            
            
            
            }
            <TouchableOpacity onPress={this.handleCloseModal}>
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    border:'solid',
    borderColor:'black',
    backgroundColor: 'orange',
    padding: 10,
  },
  modalContainer: {
    position: 'absolute',
    top: 280,
    color:'orange',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    width: '100%',
    height: '30%',
  
  },
});

export default MyComponent;




