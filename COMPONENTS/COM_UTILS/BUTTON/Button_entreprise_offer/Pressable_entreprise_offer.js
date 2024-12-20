import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { FlipInXDown } from 'react-native-reanimated';




function Pressable_entreprise_offer({title, onPress}) {
    
  const handleClick = (title) => {
    onPress(title);
    //console.log("titre : " + title);
  };


  const leRetour =     
            <TouchableOpacity
              onPress={handleClick}
                style={{
                borderWidth: 1, 
                alignItems: 'center',
                justifyContent: 'center', 
                margin:10 
            }}>
                <View>
                    <h2>{title}</h2>
                </View>
            </TouchableOpacity>

  return (leRetour);
}

export default Pressable_entreprise_offer;
