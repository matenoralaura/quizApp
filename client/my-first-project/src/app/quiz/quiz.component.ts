import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../shared/services/quiz/quiz.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ NgFor, NgIf, NgClass, NavbarComponent ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  showWarning: boolean = false;

  isQuizStarted: boolean = false;
  isQuizEnded: boolean = false;
  answers: any = "";
  quiz: any = "";
  currentUser: any;

  timeUp: boolean = false;

  remainingTime:number = 10;

  timer = interval(1000);
  subscription: Subscription [] = [];
  correctAnswerCount: number = 0;

  id = "";


  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private authService: AuthService
  ) { 
  }

  ngOnInit(): void { 
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.loadQuestions(this.id)
      }
    )
  }
  loadQuestions(id: string) {
    this.quizService.getOne(id).subscribe((res: any)=>{
      this.quiz = res.find((quiz: { _id: string; }) => quiz._id == id);
      this.answers = [this.quiz.answer1, this.quiz.answer2, this.quiz.answer3, this.quiz.answer4]
    })
  }

  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false; 
  }

  start() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;  
  }

  back() {
    this.router.navigateByUrl('/quizzes');
  }

  showWarningPopup() {
    this.showWarning = true;
  }

  selectOption(option: any) {
    if(option.isCorrect) {
      this.correctAnswerCount ++;
      //user pont ++
      this.addPoint()
    }
    option.isSelected = true;
    this.isQuizEnded = true;
  }
  isOptionSelected(options: any) {
    const selectionCount = options.filter((m:any)=>m.isSelected == true).length;
    if(selectionCount == 0) {
      return false;
    } else {
      return true;
    }
  }
  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;  
   this.subscription.push(this.timer.subscribe(res=> {
      if(this.remainingTime != 0) {
        this.remainingTime --;
      } else {
        this.timeUp = true;
      }
    })
   )
  }

  addPoint() {
    this.authService.addPoint().subscribe(
      () => {
        console.log('Point added successfully');
      },
      error => {
        console.error('Error adding point:', error);
      }
    );
  }
}
