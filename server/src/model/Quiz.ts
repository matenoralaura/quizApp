import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

interface Answer {
    possibleAnswer: string;
    isCorrect: boolean;
    isSelected: boolean;
  }

interface Quiz extends Document {
    quizName: string;
    question: string;
    answer1: Answer;
    answer2: Answer;
    answer3: Answer;
    answer4: Answer;
    createdAt: Date;
}

const answerSchema = new mongoose.Schema({
    possibleAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    isSelected: { type: Boolean, required: true }
});

const QuizSchema: Schema<Quiz> = new mongoose.Schema({
    quizName: { type: String, required: true },
    question: { type: String, required: true },
    answer1: { type: answerSchema, required: true },
    answer2: { type: answerSchema, required: true },
    answer3: { type: answerSchema, required: true },
    answer4: { type: answerSchema, required: true },
    createdAt: { type: Date, required: true }
});

export const Quiz: Model<Quiz> = mongoose.model<Quiz>('Quiz', QuizSchema);
