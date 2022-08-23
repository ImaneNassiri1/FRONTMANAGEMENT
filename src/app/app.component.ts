import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from './question';
import { QuestionService } from "./question.service";
import {  HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FRONT_STAGE_APPLICATION';
  [x: string]: any;
  fileName = '';
  public questions!: Question[] ;
  public responses!:Question[] ;
  public editQuestion!: Question | null;
  public deleteQuestion!: Question | null;
  public deleteQuestionId=this.deleteQuestion?.id;
  private apiServerUrl=environment.apiBaseUrl;
  public stepIndex!: number;
  public size:number=3;

  constructor(private questionService : QuestionService){}

  ngOnInit(): void {
    this.getQuestion();
  }

  @HostBinding('class.activeStep')
  public isActive = false;

  @Input() public set activeState(step: this) {
    this.isActive = step === this;
  }

  public getQuestion():void {
    this.questionService.getQuestions().subscribe(
      (response: Question[]) => {
        this.questions =response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getQuestionn():void {
    this.questionService.getQuestionn(this.size).subscribe(
      (response: Question[]) => {
        this.questions =response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onAddQuestion(addForm:NgForm):void{
    document.getElementById('add-question-form')?.click();
    this.questionService.addQuestion(addForm.value).subscribe(
      (response:Question) => {
        console.log(response);
        this.getQuestion();
        addForm.reset();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }

    );
  }

  public getAnswer(question:Question):void {
    this.questionService.getAnswer(question,this.size).subscribe(
      (response: Question[]) => {
        this.questions =response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onUpdateQuestion(question:Question):void{
    this.editQuestion = question ;
    this.questionService.updateQuestion(question).subscribe(
      (response:Question) => {
        console.log(response);
        this.getQuestion();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }


  public onDeleteQuestion(questionId:string):void{
    this.questionService.deleteQuestion(questionId).subscribe(
      (response:void) => {
        console.log(response);
        this.getQuestion();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }


  public searchQuestions(key: string):void {
    const results: Question[]=[];
    for (const question of this.questions) {
      if (question.question.toLowerCase().indexOf(key.toLowerCase())!== -1
        ||question.response.toLowerCase().indexOf(key.toLowerCase())!== -1
        ||question.category.toLowerCase().indexOf(key.toLowerCase())!== -1
        ||question.client.toLowerCase().indexOf(key.toLowerCase())!== -1
      ) {
        results.push(question);
      }
    }
    this.questions = results;
    if (results.length === 0 || !key) {
      this.getQuestion();
    }
  }
  public onOpenModal(question: Question | null,mode:String):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add') {
      button.setAttribute('data-target','#addQuestionModal');
    }
    if (mode === 'edit') {
      this.editQuestion = question ;
      button.setAttribute('data-placement','#updateQuestionModal');
    }
    if (mode === 'delete') {
      this.deleteQuestion= question ;
      button.setAttribute('data-target','#deleteQuestionModal');
    }

    container?.appendChild(button);
    button.click();
  }
}

