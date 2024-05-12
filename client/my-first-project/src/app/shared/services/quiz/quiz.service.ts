import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../../model/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Quiz[]>('http://localhost:5000/app/quizzes', {withCredentials: true});
  }

  getOne(id: string) {
    return this.http.get<Quiz>('http://localhost:5000/app/quizzes/?id=' + id, {withCredentials: true});
  }

  create(quiz: Quiz) {
    const body = new URLSearchParams();
    body.set('quizName', quiz.quizName);
    body.set('question', quiz.question);
    body.set('answer1', JSON.stringify(quiz.answer1));
    body.set('answer2', JSON.stringify(quiz.answer2));
    body.set('answer3', JSON.stringify(quiz.answer3));
    body.set('answer4', JSON.stringify(quiz.answer4));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/new-quiz', body, {headers: headers});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteQuiz?id=' + id, {withCredentials: true});
  }
}
