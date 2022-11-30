import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListModaleComponent } from './todo-list-modale.component';

describe('TodoListModaleComponent', () => {
  let component: TodoListModaleComponent;
  let fixture: ComponentFixture<TodoListModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListModaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
