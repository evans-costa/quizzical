import {
  QuestionApiResponse,
  QuizSessionResponse,
} from "../types/api-response";
import { shuffle } from "../utils/shuffle";

export async function fetchData(): Promise<QuizSessionResponse[]> {
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
      choices: shuffle([...result.incorrect_answers, result.correct_answer]),
      select_answer: null,
      correct_answer: result.correct_answer,
      question: result.question,
    }),
  );

  return quizSessionData;
}
