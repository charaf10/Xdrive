import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const MaModalDispo = ({ visible, closeUpdateModal, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeUpdateModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.touchable} onPress={closeUpdateModal}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
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

export default MaModalDispo;
