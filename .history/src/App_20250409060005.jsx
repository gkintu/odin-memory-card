import React, { useState, useEffect } from 'react'; // Import React hooks
import Scoreboard from './components/Scoreboard'; // Import Scoreboard component
import CardGrid from './components/CardGrid';     // Import CardGrid component
import './App.css'; // Import main CSS file

function App() {
  // State variables using useState hook
  const [currentScore, setCurrentScore] = useState(0); // Tracks the current game score, starts at 0
  const [bestScore, setBestScore] = useState(0);       // Tracks the best score achieved, starts at 0
  const [pokemonList, setPokemonList] = useState([]);   // Stores the list of Pokemon data (name, image, id), starts empty
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]); // Stores the IDs of Pokemon clicked in the current round, starts empty

  // We will add data fetching logic (useEffect) and click handling logic here soon

  // Placeholder data for now (we'll replace this with API data)
  const placeholderPokemon = [
    { id: 1, name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 4, name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { id: 7, name: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
     // Add more placeholders if you like, up to 12
  ];

  // Placeholder click handler (we'll implement the real logic later)
  const handleCardClick = (pokemonId) => {
    console.log(`Card clicked: ${pokemonId}`);
    // Game logic will go here...
     // For now, just shuffle the placeholder list on any click
    shufflePokemon(placeholderPokemon); // Call shuffle (we need to define this function)
    setPokemonList([...placeholderPokemon]); // Update state with the shuffled list
  };

  // Placeholder shuffle function (we'll refine this)
  // Basic Fisher-Yates shuffle algorithm
  const shufflePokemon = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
  };

   // Initialize pokemonList state with placeholders for now
   // Use useEffect to run this only once on component mount
   useEffect(() => {
     shufflePokemon(placeholderPokemon); // Shuffle initially
     setPokemonList([...placeholderPokemon]); // Set the initial shuffled list
   }, []); // Empty dependency array means run only once

  return (
    <div className="App"> {/* Main application container */}
      <h1>Pokemon Memory Game</h1> {/* Game title */}
      <Scoreboard currentScore={currentScore} bestScore={bestScore} /> {/* Render Scoreboard, passing scores as props */}
      {/* Render CardGrid, passing the list of pokemon and the click handler */}
      <CardGrid pokemonList={pokemonList} onCardClick={handleCardClick} />
    </div>
  );
}

export default App; // Export the App component