export default function StartScreen({ start }: { start: () => void }) {
  return (
    <div className="start-screen">
      <h1 className="start-title">Quizzical</h1>
      <h2 className="start-description">
        Test your knowledge with this awesome trivia game!
      </h2>
      <button className="start-button" onClick={start}>
        Start quiz
      </button>
    </div>
  );
}
