import React from 'react';

// Simple functional component for a single Pokemon card
// Takes pokemon object (with name, image) and onClick handler as props
function PokemonCard({ pokemon, onClick }) {
  // If no pokemon data is provided, don't render anything
  if (!pokemon) return null;

  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon.id)}> {/* Card container, triggers onClick with pokemon id when clicked */}
      <img src={pokemon.image} alt={pokemon.name} /> {/* Pokemon image */}
      <p>{pokemon.name}</p> {/* Pokemon name */}
    </div>
  );
}

export default PokemonCard; // Export the component