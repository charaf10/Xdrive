import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export default function DragAndDrop() {
  // Position de départ
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gestionnaire du geste de glissement
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      // Contexte initial du déplacement
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      // Mise à jour des valeurs en fonction du déplacement
      translateX.value = ctx.startX + event.translationX; 
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      // Vous pouvez ajouter des animations ou des limites ici
    },
  });

  // Style animé en fonction des valeurs de translation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <h1>DRAG AND DROP TEST</h1>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
});
