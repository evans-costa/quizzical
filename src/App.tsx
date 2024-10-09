import { useState } from "react";

import Quiz from "./components/Quiz";
import StartScreen from "./components/StartScreen";

export default function App() {
  const [startGame, setStartGame] = useState<boolean>(false);

  return (
    <main className="container">
      {!startGame ? <StartScreen start={() => setStartGame(true)} /> : <Quiz />}
    </main>
  );
}
