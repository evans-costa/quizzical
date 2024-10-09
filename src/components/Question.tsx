import { decode } from "html-entities";

import { QuizSessionResponse } from "./types/api-response";
import Answer from "./Answer";

interface IProps {
  question: QuizSessionResponse;
  isQuizEnd: boolean;
  selectAnswer: (answer: string, id: number) => void;
}

export default function Question({
  question,
  selectAnswer,
  isQuizEnd,
}: IProps) {
  function setAnswerStatus(choice: string): string {
    if (isQuizEnd && question.correct_answer === choice) {
      return "correct";
    } else if (
      isQuizEnd &&
      question.select_answer === choice &&
      choice !== question.correct_answer
    ) {
      return "incorrect";
    }

    return choice === question.select_answer ? "active" : "";
  }

  return (
    <div className="quiz-question">
      <h3 className="quiz-question-title">{decode(question.question)}</h3>
      <div className="quiz-choices">
        {question.choices.map((choice) => (
          <Answer
            key={choice}
            answer={decode(choice)}
            selected={() => selectAnswer(choice, question.id)}
            setAnswerStatus={() => setAnswerStatus(choice)}
            disabled={isQuizEnd}
          />
        ))}
      </div>
    </div>
  );
}
