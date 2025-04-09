// src/App.jsx
import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import './App.css';

// Helper function for shuffling array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  let shuffledArray = [...array]; // Create a copy to avoid modifying the original array directly
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get random index from 0 to i
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray; // Return the shuffled copy
};

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonList, setPokemonList] = useState([]); // State to hold the actual Pokemon data
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]); // State to track clicked Pokemon IDs
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track potential errors during fetch

  // useEffect hook to fetch Pokemon data when the component mounts
  useEffect(() => {
    // Define the async function to fetch data
    const fetchPokemon = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        // 1. Fetch a list of 12 Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12'); // Fetch first 12 pokemon list
        if (!response.ok) { // Check if fetch was successful
          throw new Error(`HTTP error! status: ${response.status}`); // Throw error if not ok
        }
        const data = await response.json(); // Parse the JSON response body

        // 2. For each Pokemon, fetch its detailed data (including image)
        const detailedPromises = data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url); // Fetch details using the URL from the list
          if (!detailResponse.ok) { // Check if detail fetch was successful
            throw new Error(`HTTP error! status: ${detailResponse.status}`); // Throw error
          }
          const detailData = await detailResponse.json(); // Parse detail JSON
          return { // Return an object with the data we need
            id: detailData.id, // Pokemon's unique ID
            name: detailData.name, // Pokemon's name
            image: detailData.sprites.front_default, // URL for the front sprite image
          };
        });

        // 3. Wait for all detail fetches to complete
        const detailedPokemonData = await Promise.all(detailedPromises); // Resolve all promises concurrently

        // 4. Shuffle the fetched data initially and update state
        setPokemonList(shuffleArray(detailedPokemonData)); // Set the fetched and shuffled data into state

      } catch (e) {
        console.error("Failed to fetch Pokemon data:", e); // Log error to console
        setError("Failed to load Pokemon. Please try refreshing."); // Set error message for the user
      } finally {
        setIsLoading(false); // Finish loading, regardless of success or error
      }
    };

    fetchPokemon(); // Call the fetch function
  }, []); // Empty dependency array [] means this effect runs only once when the component mounts

  // Placeholder click handler (we'll implement full logic next)
  const handleCardClick = (pokemonId) => {
    // Check if the clicked Pokemon ID is already in the clickedPokemonIds array
    if (clickedPokemonIds.includes(pokemonId)) {
      // --- GAME OVER LOGIC ---
      console.log("Game Over! Clicked the same Pokemon twice.");

      // 1. Update bestScore if currentScore is higher
      if (currentScore > bestScore) {
        setBestScore(currentScore); // Set new best score
      }

      // 2. Reset currentScore to 0
      setCurrentScore(0); // Reset current score

      // 3. Clear the list of clicked Pokemon IDs for the new round
      setClickedPokemonIds([]); // Reset clicked IDs

      // 4. Shuffle cards for the new game (optional, could just reset score)
      //    We shuffle regardless below, so this line is technically redundant here
      //    but good for clarity of resetting the round.

    } else {
      // --- CORRECT GUESS LOGIC ---
      console.log("Correct guess!");

      // 1. Increment currentScore
      const newScore = currentScore + 1;
      setCurrentScore(newScore); // Update score state

      // 2. Add the clicked Pokemon ID to the list of clicked IDs
      setClickedPokemonIds(prevClickedIds => [...prevClickedIds, pokemonId]); // Add new ID to the array

      // 3. Check if this score is now higher than bestScore (update bestScore live)
       if (newScore > bestScore) {
         setBestScore(newScore);
       }
    }

    // --- ALWAYS SHUFFLE CARDS AFTER EVERY CLICK ---
    setPokemonList(prevList => shuffleArray(prevList)); // Shuffle the list for the next turn
  };

  // Render loading or error state if necessary
  if (isLoading) return <div>Loading Pokemon...</div>; // Show loading message
  if (error) return <div>Error: {error}</div>; // Show error message

  // Render the main game UI
  return (
    <div className="App">
      <h1>Pokemon Memory Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      {/* Pass the actual pokemonList and the handleCardClick function */}
      <CardGrid pokemonList={pokemonList} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;