import React from 'react';

// Simple functional component for the scoreboard
// Takes currentScore and bestScore as props
function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard"> {/* Container for the scoreboard */}
      <h2>Scoreboard</h2> {/* Title */}
      <p>Current Score: {currentScore}</p> {/* Display current score */}
      <p>Best Score: {bestScore}</p> {/* Display best score */}
    </div>
  );
}

export default Scoreboard; // Export the component for use in other files