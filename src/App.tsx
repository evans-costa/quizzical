import { useState } from "react";

export default function App() {
  const [startGame, setStartGame] = useState(false);

  return (
    <main className="container">
      {!startGame ? (
        <div className="start-screen">
          <h1 className="start-title">Quizzical</h1>
          <h2 className="start-description">
            Test your knowledge with this awesome trivia game!
          </h2>
          <button className="start-button" onClick={() => setStartGame(true)}>
            Start quiz
          </button>
        </div>
      ) : (
        <div>Quiz</div>
      )}
    </main>
  );
}
