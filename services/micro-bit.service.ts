import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicroBitService {

  constructor(private httpClient : HttpClient) { }

  checkFirst()
  {
    this.httpClient.get("http://localhost:4000/api/first").subscribe(
      {
        next : (result) => {console.log(result)},
        error : (error) => {console.log(error)}
      }
    )
  }

  getTemperature()
  {
    this.httpClient.get("http://localhost:4000/api/temperature").subscribe(
      {
        next : (result) => {console.log(result)},
        error : (error) => {console.log(error)}
      }
    )
  }

  reset()
  {
    this.httpClient.get("http://localhost:4000/api/reset").subscribe(
      {
        next : (result) => {console.log(result)},
        error : (error) => {console.log(error)}
      }
    )
  }

  doAnything(code : string)
  {
    const body = { code }
    this.httpClient.post("http://localhost:4000/api/do", body).subscribe(
      {
        next : (result) => {console.log(result)},
        error : (error) => {console.log(error)}
      }
    )
  }
}
