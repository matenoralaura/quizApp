import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Quiz } from '../shared/model/Quiz';
import { QuizService } from '../shared/services/quiz/quiz.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-list-quizzes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule,  MatDialogModule, RouterLink, MatSnackBarModule, NavbarComponent],
  templateUrl: './list-quizzes.component.html',
  styleUrl: './list-quizzes.component.scss'
})
export class ListQuizzesComponent {
  quizzes!: Quiz[];
  columns = ['quizName']

  constructor(
    private quizService: QuizService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.quizService.getAll().subscribe({
      next: (data) => {
        this.quizzes = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, { duration: duration });
  }

}
