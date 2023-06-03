import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Seat = ({ playerName }) => {
  return (
    <View style={styles.seat}>
      <Text style={styles.playerName}>{playerName}</Text>
    </View>
  );
};

const Table = () => {
  const [seats, setSeats] = useState([]);

  const createSeat = () => {
    const newSeat = {
      id: seats.length + 1,
      playerName: `Joueur ${seats.length + 1}`,
    };
    setSeats([...seats, newSeat]);
  };

  return (
    <View style={styles.table}>
      {seats.map((seat) => (
        <Seat key={seat.id} playerName={seat.playerName} />
      ))}
      <Button title="Ajouter un siège" onPress={createSeat} />
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#006400',
    borderRadius: 10,
    padding: 20,
  },
  seat: {
    width: 80,
    height: 80,
    backgroundColor: '#ffd700',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    color: '#000',
  },
});

export default Table;
