import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, tap} from "rxjs";

interface ResponseModel<MODEL> {
  data: MODEL;
  result: any;
}

interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
}

interface AuthModel {
  email: string;
  password: string;
}

interface SignUpModel extends AuthModel{
  firstName: string;
  lastName: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/auth';
  }

  signIn(authModel: AuthModel): Observable<ResponseModel<UserModel>> {
    return this.httpClient
      .post<ResponseModel<UserModel>>(this.url+'/signIn', authModel)
      .pipe(tap(res => localStorage.setItem('token', res.data.token)));
  }

  signUp(signUpModel: SignUpModel): Observable<ResponseModel<UserModel>> {
      return this.httpClient.post<ResponseModel<UserModel>>(this.url+'/signUp', signUpModel)   
  }

  googleSignIn(idToken: string): Observable<ResponseModel<UserModel>> {
    // localStorage.getItem()
    return this.httpClient.post<ResponseModel<UserModel>>(this.url+'/google/signIn', idToken)
  }

  googleSignUp(idToken: string){
    return this.httpClient.post<ResponseModel<UserModel>>(this.url+'/google/signUp', idToken)
  }
}
