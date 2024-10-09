interface IProps {
  answer: string;
  selected: () => void;
  setAnswerStatus: (choice: string) => string;
  disabled: boolean;
}

export default function Answer({
  answer,
  selected,
  setAnswerStatus,
  disabled,
}: IProps) {
  return (
    <button
      className={`quiz-alternative ${setAnswerStatus(answer)}`}
      onClick={selected}
      disabled={disabled}
    >
      <span>{answer}</span>
    </button>
  );
}
