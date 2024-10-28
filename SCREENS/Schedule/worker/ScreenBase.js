import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ListDrivers from '../../../dash/dash_admin/worker/ListWorkers2';

const BaseScreen = () => {
  const [activeTab, setActiveTab] = useState('Onglet1');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Onglet1':
        return <ListDrivers />;
      case 'Onglet2':
        return <Text style={styles.tabContent}>Contenu de l'Onglet 2 </Text>;
      case 'Onglet3':
        return <Text style={styles.tabContent}>Contenu de l'Onglet 3</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenue sur mon écran de base</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Informations supplémentaires</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.tabMenu}>
          <TouchableOpacity onPress={() => setActiveTab('Onglet1')}>
            <Text style={activeTab === 'Onglet1' ? styles.activeTabText : styles.tabMenuText}>Onglet 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Onglet2')}>
            <Text style={activeTab === 'Onglet2' ? styles.activeTabText : styles.tabMenuText}>Onglet 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Onglet3')}>
            <Text style={activeTab === 'Onglet3' ? styles.activeTabText : styles.tabMenuText}>Onglet 3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContentContainer}>
          {renderTabContent()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 50,
    backgroundColor: '#6abf69', // Couleur verte
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  subHeader: {
    height: 50,
    backgroundColor: '#8d6e63', // Couleur brune
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#eceff1',
    padding: 10,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  tabMenuText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    fontSize: 16,
    color: '#6abf69', // Couleur verte pour l'onglet actif
    fontWeight: 'bold',
  },
  tabContentContainer: {
    flex: 1,  // Important pour permettre le défilement
  },
  tabContent: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default BaseScreen;
