export interface QuestionApiResponse {
  response_code: string;
  results: QuizApiResult[];
}

export interface QuizApiResult {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

export interface QuizSessionResponse {
  id: number;
  type: string;
  difficulty: string;
  category: string;
  choices: string[];
  correct_answer: string;
  question: string;
  select_answer: null | string;
}
