import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { FlipInXDown } from 'react-native-reanimated';

function Button_basic({ title, onPress, usern, passw }) {
    
  const handleClick = () => {
    onPress(usern, passw); // Passez le titre en tant que paramètre à la fonction onPress
  };


  const leRetour =     
            <Pressable onPress={handleClick} 
            style={{
                backgroundColor:'black',
                height: 30,
                width:100,
                borderColor: 'blue',
                borderWidth: 1, 
                color: 'white',
                Text: 'red',
                alignItems: 'center',
                justifyContent: 'center',   
                }}>

                <View>
                    <Text
                        style={{
                            color:'white',
                        }}>
                        {title}
                    </Text>
                </View>

            </Pressable>

  return (leRetour);
}

export default Button_basic;
