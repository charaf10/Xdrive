import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomPageLayout = () => {
  return (
    <View style={styles.container}>

      {/* First row: Horizontal Menu */}
      <View style={styles.menuRow}>
        <Text style={styles.menuItem}>Menu 1</Text>
        <Text style={styles.menuItem}>Menu 2</Text>
        <Text style={styles.menuItem}>Menu 3</Text>
      </View>

      {/* Second row: Main content area with 3 columns */}
      <View style={styles.mainContentRow}>
        <View style={styles.sideColumn}>
          <Text>Left Column (20%)</Text>
        </View>
        <View style={styles.middleColumn}>
          <Text>Middle Column (60%)</Text>
        </View>
        <View style={styles.sideColumn}>
          <Text>Right Column (20%)</Text>
        </View>
      </View>

      {/* Third row: 5 equal sections */}
      <View style={styles.footerRow}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.footerItem}>
            <Text>Section {index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#4CAF50',
  },
  menuItem: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContentRow: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  sideColumn: {
    flex: 2,
    backgroundColor: '#f1f1f1',
    margin: 5,
    padding: 10,
  },
  middleColumn: {
    flex: 6,
    height:'100%',
    backgroundColor: '#ddd',
    margin: 5,
    padding: 10,
  },
  footerRow: {
    flexDirection: 'row',
    height:'30%',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333',
  },
  footerItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomPageLayout;
