import { useCallback, useEffect, useState } from "react";
import { QuizSessionResponse } from "../types/api-response";
import Question from "./Question";
import { fetchData } from "../lib/fetchQuestions";
import { shuffle } from "../utils/shuffle";

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizSessionResponse[]>([]);
  const [quizEnd, setQuizEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const fetchQuestions = useCallback(async () => {
    setError("");
    setLoading(true);

    const data = await fetchData();

    if (Number(data.response_code) !== 0) {
      setLoading(false);
      setError("Error when retrieving questions. Please try again.");
      return;
    }

    const questionsResults: QuizSessionResponse[] = data.results.map(
      (result, index) => ({
        id: index,
        type: result.type,
        difficulty: result.difficulty,
        category: result.category,
        choices: shuffle([...result.incorrect_answers, result.correct_answer]),
        select_answer: null,
        correct_answer: result.correct_answer,
        question: result.question,
      }),
    );

    setQuestions(questionsResults);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestions().catch(console.error);
  }, [fetchQuestions]);

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

  function handleResetGame() {
    setScore(0);
    setQuestions([]);
    setQuizEnd(false);
    fetchQuestions().catch(console.error);
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
    <div className="quiz-screen">
      {error && <p className="loading">{error}</p>}
      {loading ? (
        <p className="loading">Loading questions...</p>
      ) : (
        questionElements
      )}
      <div className="quiz-submit">
        {!quizEnd ? (
          <button className="quiz-button" onClick={handleQuizEnd}>
            Check answers
          </button>
        ) : (
          <div className="quiz-end">
            <p>You scored {score}/5 correct answers</p>
            <button className="quiz-button" onClick={handleResetGame}>
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
