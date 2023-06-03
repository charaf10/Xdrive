import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Entreprise_dash(props) {

  return (
    <View>
      <Text>Bonjour {props.id}</Text>
    </View>
  );
}