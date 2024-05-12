import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { QuizService } from '../shared/services/quiz/quiz.service';

@Component({
  selector: 'app-new-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-quiz.component.html',
  styleUrl: './new-quiz.component.scss'
})
export class NewQuizComponent implements OnInit {
  quizForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      quizName: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer1: this.formBuilder.group({
        possibleAnswer: ['', Validators.required],
        isCorrect: [false],
        isSelected: [false],
      }),
      answer2: this.formBuilder.group({
        possibleAnswer: ['', Validators.required],
        isCorrect: [false],
        isSelected: [false],
      }),
      answer3: this.formBuilder.group({
        possibleAnswer: ['', Validators.required],
        isCorrect: [false],
        isSelected: [false],
      }),
      answer4: this.formBuilder.group({
        possibleAnswer: ['', Validators.required],
        isCorrect: [false],
        isSelected: [false],
      }),
    })
  }


  onSubmit() {
    if (this.quizForm.valid) {
      console.log('Form data:', this.quizForm.value);
      this.quizService.create(this.quizForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  goBack() {
    this.location.back();
  }

}
