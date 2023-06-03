import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';


/* NAVIGATION */
import { createDrawerNavigator } from '@react-navigation/drawer';
import Test from './Test';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
      <Drawer.Navigator>
          <Drawer.Screen name="Test" component={Test} />
      </Drawer.Navigator>

  );
}


