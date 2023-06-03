import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { FlipInXDown } from 'react-native-reanimated';

function Button_basic({ title, onPress, idItem}) {
    
  const handleClick = (title) => {
    onPress(title); // Passez le titre en tant que paramètre à la fonction onPress
    console.log(title);
  };


  const leRetour =     
            <Pressable onPress={handleClick} 
            style={{
              position: 'absolute',
              top: 35,
              right: 0,
              width: 20,
              height: 20,
              //fontSize:20,
              borderRadius:50,
              flex:1,
              justifyContent:'center',
              alignContent:'center',
              textAlign:'center',
              backgroundColor:'grey',
                }}>

                <View>
                    <Text>
                        {title}
                    </Text>
                </View>

            </Pressable>

  return (leRetour);
}

export default Button_basic;
