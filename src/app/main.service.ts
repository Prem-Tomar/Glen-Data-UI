import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getEvents } from '../environments/environment';
import { EventRequestModel } from './src/models/EventRequestModel';
import { EventResponseModel } from './src/models/EventResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private _http: HttpClient) { }

  public getAllEvents(body: EventRequestModel = {}, page: number = 1, batch: number = 10): Observable<EventResponseModel> {
    return this._http.post<EventResponseModel>(getEvents(page, batch), body);
  }

}
