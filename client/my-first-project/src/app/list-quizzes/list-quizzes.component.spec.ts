import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizzesComponent } from './list-quizzes.component';

describe('ListQuizzesComponent', () => {
  let component: ListQuizzesComponent;
  let fixture: ComponentFixture<ListQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuizzesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
