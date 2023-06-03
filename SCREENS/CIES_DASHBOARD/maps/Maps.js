import React from 'react';
import { View, Text } from 'react-native';
import {calculateDistance} from '../../../Lakay_function/GetDistance';



const MyComponent = () => {
  const referencePosition = {
    latitude: 44.8566,
    longitude: 3.3522
  };

  const positionToCalculate = {
    latitude: 45.5074,
    longitude: 8.1278
  };

  
  const distance =  calculateDistance(
    referencePosition.latitude,
    referencePosition.longitude,
    positionToCalculate.latitude,
    positionToCalculate.longitude
  );

  return (
    <View>
            <Text>Point 1: {referencePosition.latitude} , {referencePosition.longitude}</Text>
            <Text>Point 2: {positionToCalculate.latitude} , {positionToCalculate.longitude}</Text>

      <Text>Distance: {distance.toFixed(2)} km</Text>
    </View>
  );
};

export default MyComponent;

