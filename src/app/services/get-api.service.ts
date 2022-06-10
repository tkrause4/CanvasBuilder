import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(
    private http:HttpClient
  ) { }

  apiCall(db:string){
    return this.http.get('http://localhost:3000/'+db);
  }

  getCanvas(id:string){
    let url = 'http://localhost:3000/canvases/'+id;
    return this.http.get(url)
  }
}
