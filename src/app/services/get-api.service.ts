import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  db:string = "http://localhost:3000/";

  constructor(
    private http:HttpClient
  ) { }

  apiCall(db:string){
    return this.http.get('http://localhost:3000/'+db);
  }

  getCanvas(id:string, type:string){
    let url = this.db + type + '/' + id;
    return this.http.get(url)
  }
}
