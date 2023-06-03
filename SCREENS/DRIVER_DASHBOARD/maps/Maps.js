import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const DistanceCalculator = () => {
  const [point1, setPoint1] = useState({ latitude: '', longitude: '' });
  const [point2, setPoint2] = useState({ latitude: '', longitude: '' });
  const [distance, setDistance] = useState('');

  const calculateDistance = () => {
    // Vérifiez si les points sont valides (non vides)
    if (point1.latitude && point1.longitude && point2.latitude && point2.longitude) {
      const lat1 = parseFloat(point1.latitude);
      const lon1 = parseFloat(point1.longitude);
      const lat2 = parseFloat(point2.latitude);
      const lon2 = parseFloat(point2.longitude);

      // Calcul de la distance entre les deux points
      const distance = calculateDistanceBetweenPoints(lat1, lon1, lat2, lon2);

      // Mettre à jour l'état de la distance
      setDistance(distance.toFixed(2) + ' km');
    }
  };

  const calculateDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
    // Calcul de la distance en utilisant une formule appropriée
    // Cette fonction doit être implémentée selon votre propre logique de calcul de distance

    // Ici, je vais simplement retourner la différence de latitude et de longitude
    const latDiff = Math.abs(lat2 - lat1);
    const lonDiff = Math.abs(lon2 - lon1);
    return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lonDiff, 2));
  };

  const separe = <br/>

  return (
    <View>
      <Text>Point 1:</Text>
      {separe}
      <TextInput
        placeholder="Latitude"
        value={point1.latitude}
        onChangeText={(text) => setPoint1({ ...point1, latitude: text })}
      />
      {separe}
      <TextInput
        placeholder="Longitude"
        value={point1.longitude}
        onChangeText={(text) => setPoint1({ ...point1, longitude: text })}
      />
    {separe}
    <hr/>    <hr/>
      <Text>Point 2:</Text>
      {separe}
      <TextInput
        placeholder="Latitude"
        value={point2.latitude}
        onChangeText={(text) => setPoint2({ ...point2, latitude: text })}
      />{separe}
      <TextInput
        placeholder="Longitude"
        value={point2.longitude}
        onChangeText={(text) => setPoint2({ ...point2, longitude: text })}
      />{separe}

      <Button title="Calculate Distance" onPress={calculateDistance} />

      {distance !== '' && <Text>Distance: {distance}</Text>}
    </View>
  );
};

export default DistanceCalculator;
