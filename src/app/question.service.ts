import { Question } from "./question";
import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn:'root'
})
export class QuestionService{
  private apiServerUrl=environment.apiBaseUrl;



  constructor(private http:HttpClient){ }



  public getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/all`)
  }

  public getQuestionn(size:number):Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/all?size=`+size)
  }



  public getAnswerQuestion(question: Question):Observable<Question[]>{
    return this.http.post<Question[]>(`${this.apiServerUrl}/question/tests`,question);
  }

  public getQuestion(question: Question):Observable<Question[]>{
    return this.http.post<Question[]>(`${this.apiServerUrl}/question/testss`,question);
  }

  public getAnswer(question: Question,size:number):Observable<Question[]>{
    return this.http.post<Question[]>(`${this.apiServerUrl}/question/testss?size=`+size,question);
  }

  public getQuestionCategory(question: Question):Observable<Question[]>{
    return this.http.post<Question[]>(`${this.apiServerUrl}/question/Category`,question);
  }


  public addQuestion(question: Question):Observable<Question>{
    return this.http.post<Question>(`${this.apiServerUrl}/question/add`,question);
  }


  public updateQuestion(question: Question):Observable<Question>{
    return this.http.put<Question>(`${this.apiServerUrl}/question/update`,question);
  }

  public deleteQuestion(questionId:String):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/question/delete/${questionId}`);
  }


}
export class ProgressHelperService {
  public eventHelper = new Subject<{ prev: boolean; next: boolean }>();
  constructor() {}
}


