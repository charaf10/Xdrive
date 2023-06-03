import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function MyComponent({ title, onPress }) {
    
  const handleClick = () => {
    onPress(title); // Passez le titre en tant que paramètre à la fonction onPress
    console.log("com: " + title);
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default MyComponent;
