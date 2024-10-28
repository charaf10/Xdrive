import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const MaModalCreate = ({ visible, closeCreateModal, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeCreateModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.touchable} onPress={closeCreateModal}>
            <Text  style={styles.txt}>X</Text>
          </TouchableOpacity>

          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 10,
    width:'40%',
  },  
  txt:{
    color:'white',
  },
  touchable: {
    marginLeft:'90%',
    backgroundColor: 'black',
    padding: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
});

export default MaModalCreate;
