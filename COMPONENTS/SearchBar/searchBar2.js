import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

const SearchComponent = ({onUpdate}) => {
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([]);

  const updateSearch = (text) => {

    setSearch(text);
    onUpdate(text);

  };

  return (
<SearchBar
      placeholder="Recherche..."
      onChangeText={updateSearch}
      value={search}
      containerStyle={{
        backgroundColor: 'transparent', // Fond transparent
        borderBottomColor: 'transparent', // Bordure inférieure transparente
        borderTopColor: 'transparent', // Bordure supérieure transparente
        paddingHorizontal: 0, // Aucun padding horizontal
      }}
      inputContainerStyle={{
        backgroundColor: '#f2f2f2', // Couleur de fond de l'input
        borderRadius: 10, // Coins arrondis
        height: 40, // Hauteur de la barre de recherche
        //width:'100%',
    }}
      inputStyle={{
        color: '#333', // Couleur du texte saisi
        width:'100%',
      }}
      placeholderTextColor="#999" // Couleur du texte de l'espace réservé
    />
  );
};

export default SearchComponent;