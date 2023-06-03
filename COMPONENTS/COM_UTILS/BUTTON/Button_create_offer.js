import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

function Button_sign({ title, onPress}) {
    
  const handleClick = () => {
    onPress(title); // Passez le titre en tant que paramètre à la fonction onPress
  };


  const leRetour =     
            <Pressable onPress={handleClick} 
            style={{
                backgroundColor:'white',
                height: 30,
                width:180,
                borderRadius: 15,
                borderColor: 'black',
                borderWidth: 1, 
                color: 'white',
                Text: 'red',
                alignItems: 'center',
                justifyContent: 'center',   
                }}>

                <View>
                    <Text
                        style={{
                            color:'black',
                        }}>
                        {title}
                    </Text>
                </View>

            </Pressable>

  return (leRetour);
}

export default Button_sign;
