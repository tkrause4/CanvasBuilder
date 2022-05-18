import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(
    private http:HttpClient
  ) { }

  apiCall(){
    return this.http.get('http://localhost:3000/canvases');
  }

  getCanvas(){
    return this.http.get('http://localhost:3000/canvases/627e751d75d32499d6e733c8')
  }
}
