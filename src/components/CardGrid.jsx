// src/components/CardGrid.jsx
import React from 'react';
import PokemonCard from './PokemonCard'; // Import the PokemonCard component

// Functional component for the grid of Pokemon cards
// Takes pokemonList (array of pokemon objects) and onCardClick handler as props
function CardGrid({ pokemonList, onCardClick }) {
  return (
    <div className="card-grid"> {/* Container for the grid */}
      {/* Map over the pokemonList array */}
      {pokemonList.map((pokemon) => (
        // Render a PokemonCard for each pokemon in the list
        // Pass the pokemon data and the click handler down as props
        // Use pokemon.id as the key for React's list rendering optimization
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default CardGrid; // Export the component