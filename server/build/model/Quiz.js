"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const answerSchema = new mongoose_1.default.Schema({
    possibleAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    isSelected: { type: Boolean, required: true }
});
const QuizSchema = new mongoose_1.default.Schema({
    quizName: { type: String, required: true },
    question: { type: String, required: true },
    answer1: { type: answerSchema, required: true },
    answer2: { type: answerSchema, required: true },
    answer3: { type: answerSchema, required: true },
    answer4: { type: answerSchema, required: true },
    createdAt: { type: Date, required: true }
});
exports.Quiz = mongoose_1.default.model('Quiz', QuizSchema);
