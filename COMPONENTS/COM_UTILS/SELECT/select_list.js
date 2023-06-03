import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');




  const retour = 

    <View>
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
            <Picker.Item label="Driver" value="Driver" />
            <Picker.Item label="Entreprise" value="Entreprise" />
        </Picker>
        {/*<Text>Selected value: {selectedValue}</Text>*/}
    </View>
  return ([retour, selectedValue]);
}

export default MyComponent;
