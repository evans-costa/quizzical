import { useCallback, useEffect, useState } from "react";

import Question from "./components/Question";
import {
  QuestionApiResponse,
  QuizSessionResponse,
} from "./components/types/api-response";

export default function App() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizSessionResponse[]>([]);
  const [quizEnd, setQuizEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);

    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&type=multiple",
    );

    const data: QuestionApiResponse = await response.json();

    const quizSessionData: QuizSessionResponse[] = data.results.map(
      (result, index) => ({
        id: index,
        type: result.type,
        difficulty: result.difficulty,
        category: result.category,
        choices: shuffleArray([
          ...result.incorrect_answers,
          result.correct_answer,
        ]),
        select_answer: null,
        correct_answer: result.correct_answer,
        question: result.question,
      }),
    );

    setQuestions(quizSessionData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i - 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function handleSelectAnswer(answer: string, id: number) {
    setQuestions((prevQuestion) =>
      prevQuestion.map((question) =>
        question.id === id ? { ...question, select_answer: answer } : question,
      ),
    );
  }

  function handleQuizEnd() {
    const checkAllQuestionAnswered = questions.every(
      (question) => question.select_answer,
    );

    if (checkAllQuestionAnswered) {
      let score: number = 0;

      questions.forEach((question) => {
        if (question.correct_answer === question.select_answer) {
          score++;
        }
      });

      setScore(score);
      setQuizEnd(true);
    }
  }

  function resetGame() {
    setScore(0);
    setQuestions([]);
    setQuizEnd(false);
    fetchQuestions();
  }

  const questionElements = questions.map((question) => (
    <Question
      key={question.question}
      question={question}
      selectAnswer={handleSelectAnswer}
      isQuizEnd={quizEnd}
    />
  ));

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
        <div className="quiz-screen">
          {loading ? <p>Loading...</p> : questionElements}
          <div className="quiz-submit">
            {!quizEnd ? (
              <button className="quiz-button" onClick={handleQuizEnd}>
                Check answers
              </button>
            ) : (
              <div className="quiz-end">
                <p>You scored {score}/5 correct answers</p>
                <button className="quiz-button" onClick={resetGame}>
                  Play again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
