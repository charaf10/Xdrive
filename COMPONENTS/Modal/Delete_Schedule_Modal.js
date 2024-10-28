import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
//import Modal from 'react-native-modal';

const DeleteConfirmationModal = ({ isVisible, onConfirm, onCancel, position  }) => {

    const { x, y } = position;

  return (
    <Modal isVisible={isVisible} style={styles.modal} backdropOpacity={0}>
      <View style={[styles.modalContainer, { top: y, left: x }]}>
        <Text style={styles.modalText}>Are you sure you want to delete?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
      },
      modalContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DeleteConfirmationModal;
