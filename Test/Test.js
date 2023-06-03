// ParentComponent.js
import React, { useState } from 'react';
import { View } from 'react-native';
import MyComponent from './Com_reuse';

function App() {

    const [valeur, setValeur] = useState("")

  const handlePress = (title) => {
    setValeur(title)
    console.log(valeur);
  };

  return (
    <View>
      <MyComponent title="Mon Titre" onPress={handlePress} />
    </View>
  );
}

export default App;
