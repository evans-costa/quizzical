import { QuestionApiResponse } from "../types/api-response";

export async function fetchData(): Promise<QuestionApiResponse> {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&category=9&type=multiple",
  );

  if (!response.ok) {
    throw new Error("Error while fetching.");
  }

  return response.json() as Promise<QuestionApiResponse>;
}
