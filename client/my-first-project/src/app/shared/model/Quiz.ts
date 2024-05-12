import { Question } from "./Question";

interface Answer {
  possibleAnswer: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface Quiz {
  quizName: string;
  question: string;
  answer1: Answer;
  answer2: Answer;
  answer3: Answer;
  answer4: Answer;
  createdAt: Date;
}